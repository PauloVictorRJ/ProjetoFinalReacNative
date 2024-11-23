import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';

interface AppBarComponentProps {
    title: string;

}

export default function AppBarComponent({
    title
}: AppBarComponentProps) {

    const MenuAction = () => {
        router.push('/listaMarcadores')
    }

    return (
        <Appbar.Header style={styles.appBar}>
            <Appbar.BackAction onPress={() => { }} />
            <Appbar.Content
                title={title}
                titleStyle={styles.title}
            />
            <Appbar.Action icon="menu" onPress={ MenuAction } />
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