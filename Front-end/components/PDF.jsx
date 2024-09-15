import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Pdf from "react-native-pdf";

export default function ReadPdf() {
  const PdfResource = {
    uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", // dummy
    cache: true,
  };

  return (
    <View>
      <Pdf
        trustAllCerts={true}
        source={PdfResource}
        style={styles.container}
        onLoadComplete={(/*numberOfPages, filePath*/) => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
