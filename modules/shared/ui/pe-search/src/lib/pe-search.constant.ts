export const INTERVAL_UPDATE_PLACEHOLDER = 3000;

export const getNextPlaceholderText = (current: string): string => {
    return current == 'SEARCH.PLACE_HOLDER.SEARCH_GIF' ? 'SEARCH.PLACE_HOLDER.SEARCH_USERNAME' : 'SEARCH.PLACE_HOLDER.SEARCH_GIF'
}