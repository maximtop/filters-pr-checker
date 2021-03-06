import { FilteringLogEvent } from './filtering-log';
import { EventChannelInterface } from './utils';
export declare const enum SiteStatus {
    /**
    * AdBlocker can't apply rules on this site
    */
    SiteInException = "SITE_IN_EXCEPTION",
    /**
    * Site is in the allowlist
    */
    SiteAllowlisted = "SITE_ALLOWLISTED",
    /**
    * Filtering on the site is working as expected
    */
    FilteringEnabled = "FILTERING_ENABLED"
}
export interface AppInterface<T> {
    /**
     * Current Configuration object
     */
    configuration?: T;
    /**
     * Is app started
     */
    isStarted: boolean;
    /**
     * Fires on filtering log event
     */
    onFilteringLogEvent: EventChannelInterface<FilteringLogEvent>;
    /**
      * Starts api
      * @param configuration
      */
    start: (configuration: T) => Promise<void>;
    /**
     * Updates configuration
     * @param configuration
     */
    configure: (configuration: T) => Promise<void>;
    /**
     * Stops api
     */
    stop: () => Promise<void>;
    /**
     * Launches assistant in the current tab
     */
    openAssistant: (tabId: number) => void;
    /**
     * Closes assistant
     */
    closeAssistant: (tabId: number) => void;
    /**
     * Returns current status for site
     */
    getSiteStatus(url: string): SiteStatus;
    /**
     * Returns number of active rules
     */
    getRulesCount(): number;
}
