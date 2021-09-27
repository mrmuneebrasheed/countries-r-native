import React from "react";
import { View, Text, Image, Button } from "react-native";
import { Card } from "react-native-elements";
import { useHistory } from "react-router";

export default function CountryCard({ countryData }) {
    const history = useHistory();
    const languages = countryData.languages;
    const flag = countryData ? countryData.flags[1] : " ";
    return (
        <Card>
            <Card.Title style={{ fontSize: 30 }}>{countryData.name}</Card.Title>
            <Card.Divider />
            <View>
                <Image
                    style={{ width: 300, height: 200 }}
                    source={{ uri: flag }}
                />
                <Text
                    style={{
                        fontSize: 25,
                        textAlign: "center",
                        padding: 10,
                    }}
                >
                    {`Capital: ${countryData.capital}`}
                </Text>
                <Text style={{ fontSize: 20, textAlign: "center" }}>
                    {`Region: ${countryData.region}`}
                </Text>
                <Card.Title
                    style={{
                        fontSize: 20,
                        backgroundColor: "grey",
                        color: "white",
                        padding: 10,
                        marginTop: 10,
                    }}
                >
                    Languages
                </Card.Title>
                <Card.Divider />
                {languages?.map((lan, index) => (
                    <Text
                        style={{
                            fontSize: 20,
                            padding: 5,
                            textAlign: "center",
                        }}
                    >
                        {`${index + 1}: ${lan.name}`}
                    </Text>
                ))}
                <Card.Divider />
            </View>
            <Button title="Go Back" onPress={() => history.push("/")} />
        </Card>
    );
}
