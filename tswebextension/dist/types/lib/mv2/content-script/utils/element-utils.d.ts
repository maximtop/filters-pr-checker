/**
 * Utils class
 */
export declare class ElementUtils {
    /**
     * Serialize HTML element
     *
     * @param element
     */
    static elementToString(element: Element): string;
    /**
     * Appends node children to the array
     *
     * @param node - element whose children we would like to add
     * @param arrayWithNodes - array where we add children
     */
    static appendChildren(node: Element, arrayWithNodes: Element[]): void;
    /**
     * Adds elements into array if they are not in the array yet
     *
     * @param {*} targetArray
     * @param {*} sourceArray
     */
    static addUnique(targetArray: Element[], sourceArray: Element[]): void;
    /**
     * Removes all elements in array
     *
     * @param elements
     */
    static removeElements(elements: Element[]): void;
    /**
     * Parses hits info from style content
     *
     * @param content style
     * @param attributeMarker
     */
    static parseInfo(content: string, attributeMarker: string): {
        filterId: number;
        ruleText: string;
    } | null;
    /**
     * Parses hits info from style content
     *
     * @param content style
     * @param attributeMarker
     */
    static parseExtendedStyleInfo(content: string, attributeMarker: string): {
        filterId: number;
        ruleText: string;
    } | null;
    /**
     * Unquotes specified value
     */
    private static removeQuotes;
}
