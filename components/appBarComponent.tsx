import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';

interface AppBarComponentProps {
    title: string;
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
            {showBack && <Appbar.BackAction onPress={BackAction} />}
            <Appbar.Content
                title={title}
                titleStyle={styles.title} />
            {showList && <Appbar.Action icon="menu" onPress={MenuAction} />}
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    appBar: {
        height: 40,
        backgroundColor: 'orange'
    },
    title: {
        fontSize: 15
    }
})