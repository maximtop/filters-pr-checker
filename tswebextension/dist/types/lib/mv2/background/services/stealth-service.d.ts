import { WebRequest } from 'webextension-polyfill';
import { RequestType } from '@adguard/tsurlfilter';
import HttpHeaders = WebRequest.HttpHeaders;
/**
 * Stealth action bitwise masks
 */
export declare enum StealthActions {
    HIDE_REFERRER = 1,
    HIDE_SEARCH_QUERIES = 2,
    BLOCK_CHROME_CLIENT_DATA = 4,
    SEND_DO_NOT_TRACK = 8,
    FIRST_PARTY_COOKIES = 16,
    THIRD_PARTY_COOKIES = 32
}
/**
 * Stealth service configuration
 * TODO: Take stealth-service from browser-extension repo
 */
export interface StealthConfig {
    /**
     * Is destruct first-party cookies enabled
     */
    selfDestructFirstPartyCookies: boolean;
    /**
     * Cookie maxAge in minutes
     */
    selfDestructFirstPartyCookiesTime: number;
    /**
     * Is destruct third-party cookies enabled
     */
    selfDestructThirdPartyCookies: boolean;
    /**
     * Cookie maxAge in minutes
     */
    selfDestructThirdPartyCookiesTime: number;
    /**
     * Remove referrer for third-party requests
     */
    hideReferrer: boolean;
    /**
     * Hide referrer in case of search engine is referrer
     */
    hideSearchQueries: boolean;
    /**
     * Remove X-Client-Data header
     */
    blockChromeClientData: boolean;
    /**
     * Adding Do-Not-Track (DNT) header
     */
    sendDoNotTrack: boolean;
    /**
     * Is WebRTC blocking enabled
     */
    blockWebRTC: boolean;
}
/**
 * Stealth service module
 */
export declare class StealthService {
    /**
     * Headers
     */
    private static readonly HEADERS;
    /**
     * Header values
     */
    private static readonly HEADER_VALUES;
    /**
     * Search engines regexps
     *
     * @type {Array.<string>}
     */
    private static readonly SEARCH_ENGINES;
    /**
     * Configuration
     */
    private readonly config;
    /**
     * Constructor
     *
     * @param config
     */
    constructor(config: StealthConfig);
    /**
     * Returns synthetic set of rules matching the specified request
     */
    getCookieRulesTexts(): string[];
    /**
     * Applies stealth actions to request headers
     *
     * @param requestUrl
     * @param requestType
     * @param requestHeaders
     */
    processRequestHeaders(requestUrl: string, requestType: RequestType, requestHeaders: HttpHeaders): StealthActions;
    /**
     * Returns set dom signal script if sendDoNotTrack enabled, otherwise empty string
     */
    getSetDomSignalScript(): string;
    /**
     * Generates rule removing cookies
     *
     * @param maxAgeMinutes Cookie maxAge in minutes
     * @param isThirdParty Flag for generating third-party rule texts
     */
    private static generateCookieRuleText;
    /**
     * Crops url path
     *
     * @param url URL
     * @return URL without path
     */
    private static createMockRefHeaderUrl;
    /**
     * Is url search engine
     *
     * @param url
     */
    private static isSearchEngine;
}
