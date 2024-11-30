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
    backgroundColor: isDarkMode ? "#023047" : "#ffffff"
}

const sizeConstants = {

}

export { fontConstants, sizeConstants, colorConstants }
