/**
 * Check if the authenticated user has a specific role.
 *
 * @param {Object} user - The authenticated user object.
 * @param {string} role - The role to check.
 * @param {string} guard - The guard name to check against (optional).
 * @returns {boolean} - True if the user has the role, false otherwise.
 */
export function hasRole(user, role, guard = null) {
    if (!user || !user.roles) {
        return false;
    }

    return user.roles.some(
        (r) => r.name === role && (!guard || r.guard_name === guard)
    );
}

/**
 * Check if the authenticated user has any of the specified roles.
 *
 * @param {Object} user - The authenticated user object.
 * @param {Array<string>} roles - The roles to check.
 * @param {string} guard - The guard name to check against (optional).
 * @returns {boolean} - True if the user has any of the roles, false otherwise.
 */
export function hasAnyRole(user, roles, guard = null) {
    if (!user || !user.roles) {
        return false;
    }

    return user.roles.some(
        (r) => roles.includes(r.name) && (!guard || r.guard_name === guard)
    );
}
