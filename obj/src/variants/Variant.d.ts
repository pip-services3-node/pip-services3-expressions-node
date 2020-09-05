import { VariantType } from "./VariantType";
/**
 * Defines container for variant values.
 */
export declare class Variant {
    private _type;
    private _value;
    static readonly Empty: Variant;
    /**
     * Constructs this class and assignes another variant value.
     * @param value a value to be assigned to this variant.
     */
    constructor(value?: any);
    /**
     * Gets a type of the variant value
     * @returns the variant value type
     */
    readonly type: VariantType;
    /**
     * Gets variant value as integer
     */
    /**
    * Sets variant value as integer
    * @param value a value to be set
    */
    asInteger: number;
    /**
     * Gets variant value as long
     */
    /**
    * Sets variant value as long
    * @param value a value to be set
    */
    asLong: number;
    /**
     * Gets variant value as boolean
     */
    /**
    * Sets variant value as boolean
    * @param value a value to be set
    */
    asBoolean: boolean;
    /**
     * Gets variant value as float
     */
    /**
    * Sets variant value as float
    * @param value a value to be set
    */
    asFloat: number;
    /**
     * Gets variant value as double
     */
    /**
    * Sets variant value as double
    * @param value a value to be set
    */
    asDouble: number;
    /**
     * Gets variant value as string
     */
    /**
    * Sets variant value as string
    * @param value a value to be set
    */
    asString: string;
    /**
     * Gets variant value as DateTime
     */
    /**
    * Sets variant value as DateTime
    * @param value a value to be set
    */
    asDateTime: Date;
    /**
     * Gets variant value as TimeSpan
     */
    /**
    * Sets variant value as TimeSpan
    * @param value a value to be set
    */
    asTimeSpan: number;
    /**
     * Gets variant value as Object
     */
    /**
    * Sets variant value as Object
    * @param value a value to be set
    */
    asObject: any;
    /**
     * Gets variant value as variant array
     */
    /**
    * Sets variant value as variant array
    * @param value a value to be set
    */
    asArray: Variant[];
    /**
     * Gets length of the array
     * @returns The length of the array or 0
     */
    /**
    * Sets a new array length
    * @param value a new array length
    */
    length: number;
    /**
     * Gets an array element by its index.
     * @param index an element index
     * @returns a requested array element
     */
    getByIndex(index: number): Variant;
    /**
     * Sets an array element by its index.
     * @param index an element index
     * @param element an element value
     */
    setByIndex(index: number, element: Variant): void;
    /**
     * Checks is this variant value Null.
     * @returns <code>true</code> if this variant value is Null.
     */
    isNull(): boolean;
    /**
     * Checks is this variant value empty.
     * @returns <code>true</code< is this variant value is empty.
     */
    isEmpty(): boolean;
    /**
     * Assignes a new value to this object.
     * @param value A new value to be assigned.
     */
    assign(value: Variant): void;
    /**
     * Clears this object and assignes a VariantType.Null type.
     */
    clear(): void;
    /**
     * Returns a string value for this object.
     * @returns a string value for this object.
     */
    toString(): string;
    /**
     * Compares this object to the specified one.
     * @param obj An object to be compared.
     * @returns <code>true</code> if objects are equal.
     */
    equals(obj: any): boolean;
    /**
     * Cloning the variant value
     * @returns The cloned value of this variant
     */
    clone(): Variant;
    /**
     * Creates a new variant from Integer value.
     * @param value a variant value.
     * @returns a created variant object.
     */
    static fromInteger(value: number): Variant;
    /**
     * Creates a new variant from Long value.
     * @param value a variant value.
     * @returns a created variant object.
     */
    static fromLong(value: number): Variant;
    /**
     * Creates a new variant from Boolean value.
     * @param value a variant value.
     * @returns a created variant object.
     */
    static fromBoolean(value: boolean): Variant;
    /**
     * Creates a new variant from Float value.
     * @param value a variant value.
     * @returns a created variant object.
     */
    static fromFloat(value: number): Variant;
    /**
     * Creates a new variant from Double value.
     * @param value a variant value.
     * @returns a created variant object.
     */
    static fromDouble(value: number): Variant;
    /**
     * Creates a new variant from String value.
     * @param value a variant value.
     * @returns a created variant object.
     */
    static fromString(value: string): Variant;
    /**
     * Creates a new variant from DateTime value.
     * @param value a variant value.
     * @returns a created variant object.
     */
    static fromDateTime(value: Date): Variant;
    /**
     * Creates a new variant from TimeSpan value.
     * @param value a variant value.
     * @returns a created variant object.
     */
    static fromTimeSpan(value: number): Variant;
    /**
     * Creates a new variant from Object value.
     * @param value a variant value.
     * @returns a created variant object.
     */
    static fromObject(value: any): Variant;
    /**
     * Creates a new variant from Array value.
     * @param value a variant value.
     * @returns a created variant object.
     */
    static fromArray(value: Variant[]): Variant;
}
