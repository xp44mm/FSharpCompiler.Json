//一分二
export const kindSelector = [
    ['圆筒', 'tube', 'circle',],
    ['方筒', 'tube', 'rectangle',],
    ['圆板', 'section', 'circle',],
    ['方板', 'section', 'rectangle',],
].map(([a, b, c]) => [a, b, c, `${b} && ${c}`])
