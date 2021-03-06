import { NetworkRule } from '@adguard/tsurlfilter';
/**
 * Cookie rules manager class
 */
export default class CookieRulesFinder {
    /**
     * Filters blocking rules
     * Used in content scripts
     *
     * @param url
     * @param rules
     */
    static getBlockingRules(url: string, rules: NetworkRule[]): NetworkRule[];
    /**
     * Finds a rule that doesn't modify cookie: i.e. this rule cancels cookie or it's a allowlist rule.
     *
     * @param cookieName Cookie name
     * @param rules Matching rules
     * @param isThirdPartyCookie
     * @return Found rule or null
     */
    static lookupNotModifyingRule(cookieName: string, rules: NetworkRule[], isThirdPartyCookie: boolean): NetworkRule | null;
    /**
     * Finds rules that modify cookie
     *
     * @param cookieName Cookie name
     * @param rules Matching rules
     * @param isThirdPartyCookie
     * @return Modifying rules
     */
    static lookupModifyingRules(cookieName: string, rules: NetworkRule[], isThirdPartyCookie: boolean): NetworkRule[];
    /**
     * Checks if rule and third party flag matches
     *
     * @param rule
     * @param isThirdParty
     */
    private static matchThirdParty;
    /**
     * Checks if $cookie rule is modifying
     *
     * @param rule $cookie rule
     * @return result
     */
    private static isModifyingRule;
}
