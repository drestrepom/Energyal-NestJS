import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class EncryptPipe implements PipeTransform {
    transform(value: any, metadata?: ArgumentMetadata): any;
}
