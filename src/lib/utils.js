/**
 * Simple classnames utility for merging Tailwind classes
 * @param  {...any} inputs - Class names to merge
 * @returns {string} Merged class string
 */
export function cn(...inputs) {
    return inputs
        .flat()
        .filter(Boolean)
        .join(' ')
        .split(' ')
        .filter((value, index, self) => self.indexOf(value) === index)
        .join(' ');
}
