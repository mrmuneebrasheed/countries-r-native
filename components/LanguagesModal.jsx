import React from "react";
import {
    View,
    Text,
    Modal,
    Button,
    Image,
    TouchableOpacity,
} from "react-native";
import { Card } from "react-native-elements";

export default function LanguagesModal({
    isVisible,
    hideModal,
    countryData,
    languageHandler,
}) {
    const languages = countryData.languages;
    return (
        <View>
            <Modal visible={isVisible} animationType="slide">
                <Card>
                    <Card.Title>{`Languages Spoken in ${countryData.name}`}</Card.Title>
                    <Card.Divider />
                    <Image
                        style={{ height: 200, width: 300 }}
                        resizeMode="cover"
                        source={{ uri: countryData.flags[1] }}
                    />
                    {languages.map((lan, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                languageHandler(lan.name);
                            }}
                        >
                            <Text style={{ fontSize: 20, padding: 5 }}>
                                {`${index + 1}: ${lan.name}`}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <Button title="Hide Modal" onPress={hideModal} />
                </Card>
            </Modal>
        </View>
    );
}
