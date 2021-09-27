import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Button,
} from "react-native";
import { Card } from "react-native-elements";
import { useHistory } from "react-router";

export default function List({
    showModal,
    filterLang,
    languageHandler,
    showCountryData,
}) {
    const history = useHistory();
    const [countries, setCountries] = useState(null);
    useEffect(() => {
        fetch("https://restcountries.com/v2/all")
            .then((res) => res.json())
            .then((result) => {
                setCountries(result);
            });
    }, []);

    const renderCountry = (item) => {
        const country = item?.item;
        const capital = country.capital;
        return (
            <TouchableOpacity
                onLongPress={() => {
                    history.push(`/country/${country.name}`);
                    showCountryData(country);
                }}
                onPress={() => showModal(country)}
            >
                <Card>
                    <Card.Title
                        style={{
                            fontSize: 30,
                            padding: 5,
                        }}
                    >
                        {country.name}
                    </Card.Title>
                    <Card.Divider />
                    <View style={styles.user}>
                        <Image
                            style={{
                                width: 300,
                                height: 200,
                                alignItems: "center",
                            }}
                            resizeMode="cover"
                            source={{ uri: country.flags[1] }}
                        />
                        <Text style={{ fontSize: 25, textAlign: "center" }}>
                            {`Capital: ${capital}`}
                        </Text>
                        <Text style={{ fontSize: 20, textAlign: "center" }}>
                            {`Region: ${country.region}`}
                        </Text>
                    </View>
                </Card>
            </TouchableOpacity>
        );
    };
    const renderFilteredCountry = (item) => {
        const country = item?.item;
        const capital = country.capital;
        if (
            filterLang === country.languages[0].name ||
            filterLang === country.languages[1]?.name
        )
            return (
                <TouchableOpacity onPress={() => showModal(country)}>
                    <Card>
                        <Card.Title
                            style={{
                                fontSize: 30,
                                padding: 5,
                            }}
                        >
                            {country.name}
                        </Card.Title>
                        <Card.Divider />
                        <View style={styles.user}>
                            <Image
                                style={{
                                    width: 300,
                                    height: 200,
                                    alignItems: "center",
                                }}
                                resizeMode="cover"
                                source={{ uri: country.flags[1] }}
                            />
                            <Text style={{ fontSize: 25, textAlign: "center" }}>
                                {`Capital: ${capital}`}
                            </Text>
                            <Text style={{ fontSize: 20, textAlign: "center" }}>
                                {`Region: ${country.region}`}
                            </Text>
                        </View>
                    </Card>
                </TouchableOpacity>
            );
        return;
    };
    return (
        <View style={styles.container}>
            <Button title="Show All" onPress={() => languageHandler("all")} />
            {!countries ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
                    horizontal
                    data={countries}
                    renderItem={
                        filterLang === "all"
                            ? renderCountry
                            : renderFilteredCountry
                    }
                    keyExtractor={(item) => item.name}
                />
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
