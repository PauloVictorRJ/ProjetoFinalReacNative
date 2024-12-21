import * as React from 'react'
import { Appbar } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { colorConstants, fontConstants } from '../styles/Global.styles'

interface AppBarComponentProps {
    title: string
    showBack: boolean
    showList: boolean
}

export default function AppBarComponent({
    title,
    showBack,
    showList
}: AppBarComponentProps) {

    const MenuAction = () => {
        router.push('/listMarkers')
    }

    const BackAction = () => {
        router.back()
    }

    return (
        <Appbar.Header style={styles.appBar}>
            {showBack && (
                <Appbar.BackAction 
                    onPress={BackAction} 
                    iconColor={colorConstants.appBarBackBtnColor}
                />
            )}
            <Appbar.Content
                title={title}
                titleStyle={styles.title} 
            />
            {showList && (
                <Appbar.Action 
                    icon="menu" 
                    onPress={MenuAction} 
                    iconColor={colorConstants.appBarMenuBtnColor}
                />
            )}
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    appBar: {
        height: 40,
        backgroundColor: colorConstants.appBarColor
    },
    title: {
        fontSize: 18,
        color: colorConstants.appBarTextColor,
        fontFamily: fontConstants.fontFamilyMystery
    }
})
