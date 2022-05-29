import { View, Text, Linking } from "react-native";
import { Button, Colors, DataTable } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { useDispatch } from "./store";

const examples = [
  "p",
  "!p",
  "p & q",
  "(!p) & q",
  "(p => q)",
  "!(p | q)",
  "(p <=> q)",
  "!(p => q)",
  "((p => q) & (r => s))",
];

export default function About() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <Text style={{ marginVertical: 10 }}>
        This app was made by{" "}
        <Text
          style={{ fontWeight: "bold", color: Colors.blue400 }}
          onPress={() => Linking.openURL("https://t.me/frectonz")}
        >
          Fraol Lemecha
        </Text>
        .
      </Text>
      <Text style={{ fontSize: 20 }}>Examples</Text>
      <View
        style={{
          flexWrap: "wrap",
          marginVertical: 10,
          flexDirection: "row",
        }}
      >
        {examples.map((example, index) => (
          <Button
            key={index}
            mode="contained"
            style={{
              marginRight: 10,
              marginBottom: 10,
            }}
            labelStyle={{
              textTransform: "lowercase",
            }}
            onPress={() => {
              navigation.goBack();
              dispatch({ type: "SET_EXPRESSION", payload: example });
            }}
          >
            {example}
          </Button>
        ))}
      </View>

      <Text style={{ fontSize: 20, marginVertical: 10 }}>Connectives</Text>

      <DataTable>
        {[
          { icon: "!", text: "Negation" },
          { icon: "|", text: "Disjunction" },
          { icon: "&", text: "Conjunction" },
          { icon: "=>", text: "Implication" },
          { icon: "<=>", text: "Bi-implication" },
        ].map(({ icon, text }, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{icon}</DataTable.Cell>
            <DataTable.Cell>{text}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
}
