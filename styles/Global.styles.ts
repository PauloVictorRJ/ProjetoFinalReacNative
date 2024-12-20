import { Appearance } from "react-native";

const isDarkMode = Appearance.getColorScheme() == 'dark'
const fontConstants = {
    fontFamilyMystery: "MysteryQuest",
    fontFamilySpaceMono: "SpaceMono",
    color: isDarkMode ? "#ffffff" : "#023047",
    sizeTitle: 18,
    sizeSubtitle: 14
}
const colorConstants = {
    backgroundColor: isDarkMode ? "#023047" : "#ffffff",
    formBackgroundColor: isDarkMode ? "#023047" : "#ffffff",
    formTextWarningColor: isDarkMode ? "#edb007" : "#000000",
    formTextColor: isDarkMode ? "#ffffff" : "#000000",
    btnColor: isDarkMode ? "#383f52" : "#000000",
}

const sizeConstants = {

}

export { fontConstants, sizeConstants, colorConstants }
