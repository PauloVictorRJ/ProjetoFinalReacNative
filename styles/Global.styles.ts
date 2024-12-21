import { Appearance, Pressable } from "react-native";

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
    appBarColor: isDarkMode ? "#023047" : "#ffffff",
    appBarTextColor: isDarkMode ? "#ffffff" : "#000000",
    appBarBackBtnColor: isDarkMode ? "#ffffff" : "#000000",
    appBarMenuBtnColor: isDarkMode ? "#ffffff" : "#000000",
    userMsg: isDarkMode ? "#ffffff" : "#000000",
    fab: isDarkMode ? 'gray' : 'orange',
    picker: isDarkMode ? "#ffffff" : "#000000",
    text: isDarkMode ? "#ffffff" : "white",
    pressableBackgroundColor: isDarkMode ? 'gray' : 'green',
}

const sizeConstants = {

}

export { fontConstants, sizeConstants, colorConstants }
