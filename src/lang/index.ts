import { createI18n } from "vue-i18n";
// 语言包
import zhCn from "./zh-cn";
import en from "./en";
const i18n = createI18n({
locale: sessionStorage.getItem("localeLang") || "zhCn",
messages: {
zhCn,
en,
},
});
export default i18n;