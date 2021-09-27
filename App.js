import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import LanguagesModal from "./components/LanguagesModal";
import List from "./components/List";
import { NativeRouter, Route } from "react-router-native";
import CountryCard from "./components/CountryCard";

export default function App() {
    const [isVisible, setIsVisible] = useState(false);
    const [countryData, setCountryData] = useState([]);
    const [filterLang, setFilterLan] = useState("all");
    const showModal = (data) => {
        setIsVisible(true);
        setCountryData(data);
    };
    const showCountryData = (data) => {
        setCountryData(data);
    };
    const hideModal = () => {
        setIsVisible(false);
    };
    const languageHandler = (lan) => {
        setFilterLan(lan);
    };
    return (
        <NativeRouter>
            <View style={styles.container}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        marginTop: 100,
                    }}
                >
                    Countries API Render
                </Text>
                {isVisible && (
                    <LanguagesModal
                        countryData={countryData}
                        hideModal={hideModal}
                        isVisible={isVisible}
                        languageHandler={languageHandler}
                    />
                )}
                <Route exact path="/">
                    <List
                        showCountryData={showCountryData}
                        languageHandler={languageHandler}
                        filterLang={filterLang}
                        showModal={showModal}
                    />
                </Route>
                <Route path="/country/:name">
                    <CountryCard countryData={countryData} />
                </Route>
            </View>
        </NativeRouter>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
