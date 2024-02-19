import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';
import { BaseEntity, DataSource, EntityManager, EntityTarget } from 'typeorm';

@ValidatorConstraint({async: false })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor (
        private dataSource : DataSource) {

    }

    async validate(value: any, args?: ValidationArguments) {
        const { entity, column } = args.constraints[0];
        
        const exists = await this.dataSource.getRepository(entity)
            .createQueryBuilder(entity.name)
            .where({ [column] :  value})
            .getExists()
            

        return exists === null;
    }

    defaultMessage(args: ValidationArguments) {
        // here you can provide default error message if validation failed
        return 'Text ($value) already exists!';
    }
}

export type IsUniqueConstraintInput = {
    entity : EntityTarget<BaseEntity>,
    column: string
};

export function IsUnique(options: IsUniqueConstraintInput, validationOptions? : ValidationOptions) {

    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'is-unique',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: IsUniqueConstraint,
        });
    };
}