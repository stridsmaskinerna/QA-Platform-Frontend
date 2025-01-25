/* eslint-disable @typescript-eslint/no-unused-vars */
import { Roles } from ".";
import { POSSIBLE_ROLES } from "../data";

// Ensure that POSSIBLE_ROLES contains all and only values from the Roles type
type PossibleRolesType = (typeof POSSIBLE_ROLES)[number]; // Derive the union type from the array
type RolesMatchCheck =
    | Exclude<Roles, PossibleRolesType>
    | Exclude<PossibleRolesType, Roles>;

// If RolesMatchCheck is never, it means Roles and POSSIBLE_ROLES are in sync
type AssertRolesAreInSync = RolesMatchCheck extends never ? true : never;

// This line will throw the compile-time error "Type 'true' is not assignable to type 'never'"
// if POSSIBLE_ROLES and the Roles type are not in sync
const assertRolesSync: AssertRolesAreInSync = true;
