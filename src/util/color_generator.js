// convert rgb value from ColorThief to Hex value
export const rgbToHex = (r, g, b) =>
    "#" +
    [r, g, b]
        .map((x) => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        })
        .join("");

// When the theme colour is generated by ColorThief, generate the background colour
// Based on the luma(brightness) value of the theme colour, the background colour is
// a brightened or darkened shade of the theme colour to provide enough contrast with
// the text which are theme coloured

export const hexToLuma = (colour) => {
    // const [bg, setBg] = useState("white");

    const hex = colour.replace(/#/, "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const lum = [0.299 * r, 0.587 * g, 0.114 * b].reduce((a, b) => a + b) / 255;
    if (lum > 0.7) {
        return adjustBrightness(colour, -60);
    } else {
        return adjustBrightness(colour, 140);
    }
};

// Brighten or darken a colour by a percentage amount by adjusting the rgb value
export function adjustBrightness(color, amount) {
    return (
        "#" +
        color
            .replace(/^#/, "")
            .replace(/../g, (color) =>
                (
                    "0" +
                    Math.min(
                        255,
                        Math.max(0, parseInt(color, 16) + amount)
                    ).toString(16)
                ).substr(-2)
            )
    );
}
