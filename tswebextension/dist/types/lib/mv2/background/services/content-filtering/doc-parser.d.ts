/**
 * Document parser wrapper
 */
export declare class DocumentParser {
    private readonly parser;
    private readonly parsererrorNS;
    constructor();
    /**
     * Checking for parse errors
     * https://developer.mozilla.org/en-US/docs/Web/API/DOMParser#Error_handling
     * @param parsedDocument
     * @returns true if html cannot parsed
     */
    private isParseError;
    /**
     * Parse html to document
     * @param html HTML content
     * @returns Document
     */
    parse(html: string): Document | null;
}
export declare const documentParser: DocumentParser;
