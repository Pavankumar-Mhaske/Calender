import NumbersBase from "../NumbersBase";
import Version from "../../base/Version";
import { BulkEligibilityListInstance } from "./v1/bulkEligibility";
import { PortingBulkPortabilityListInstance } from "./v1/portingBulkPortability";
import { PortingPortabilityListInstance } from "./v1/portingPortability";
export default class V1 extends Version {
    /**
     * Initialize the V1 version of Numbers
     *
     * @param domain - The Twilio (Twilio.Numbers) domain
     */
    constructor(domain: NumbersBase);
    /** bulkEligibilities - { Twilio.Numbers.V1.BulkEligibilityListInstance } resource */
    protected _bulkEligibilities?: BulkEligibilityListInstance;
    /** portingBulkPortabilities - { Twilio.Numbers.V1.PortingBulkPortabilityListInstance } resource */
    protected _portingBulkPortabilities?: PortingBulkPortabilityListInstance;
    /** portingPortabilities - { Twilio.Numbers.V1.PortingPortabilityListInstance } resource */
    protected _portingPortabilities?: PortingPortabilityListInstance;
    /** Getter for bulkEligibilities resource */
    get bulkEligibilities(): BulkEligibilityListInstance;
    /** Getter for portingBulkPortabilities resource */
    get portingBulkPortabilities(): PortingBulkPortabilityListInstance;
    /** Getter for portingPortabilities resource */
    get portingPortabilities(): PortingPortabilityListInstance;
}
