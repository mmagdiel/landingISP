const base = ["key", "asterisk", "check", "menu", "clock", "code", "database"];
const chart = ["chartCol", "chartLine", "dolar", "phone", "userPlus", "barChart"];
const edit = ["edit", "trash", "copy", "star", "mapPin", "send", "icon_cloud"];
const arrow = ["right", "left", "arrowRight", "up", "down", "logo", "smartphone"];
const domain = ["utensils", "listChecks", "packageCheck", "chefHat"];
const theme = ["plus", "x", "sun", "moon", "menuSquare", "calendar"];
const social = ["mail", "facebook", "instagram", "twitter", "linkedin"];
const merge = [...chart, ...edit, ...theme, ...base, ...domain];

const Icons = [...arrow, ...social, ...merge] as const;
export type Icon = (typeof Icons)[number];
