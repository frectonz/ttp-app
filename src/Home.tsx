import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, TextInput, DataTable } from "react-native-paper";
import { generateTruthTable } from "truth-table-parser";

import { useStore, useDispatch } from "./store";

const buttons = ["!", "&", "|", "=>", "<=>", "(", ")"];

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { expression } = useStore();
  const [error, setError] = useState(false);
  const [body, setBody] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [caretPosition, setCaretPosition] = useState(0);
  const [colWidths, setColWidths] = useState<number[]>([]);
  const [displayKeyBoard, setDisplayKeyBoard] = useState(false);

  const handleInput = (text: string) =>
    dispatch({ type: "SET_EXPRESSION", payload: text });

  const inputCharacter = (character: string) => {
    dispatch({
      type: "SET_EXPRESSION",
      payload:
        expression.substring(0, caretPosition) +
        character +
        expression.substring(caretPosition),
    });
  };

  const clearInput = () => {
    handleInput("");
    setHeaders([]);
    setBody([]);
  };

  const generateTable = () => {
    const data = generateTruthTable(expression);

    data.match({
      Ok(value) {
        if (value.length === 0) {
          return;
        }

        const headers = Object.keys(value[0]);

        const rows = value.map((row) => {
          const newRow = [];
          for (const key in row) {
            if (row.hasOwnProperty(key)) {
              // @ts-ignore
              newRow.push(row[key] as string);
            }
          }
          return newRow;
        });

        setHeaders(headers);
        setColWidths(headers.map((header) => header.length * 30));
        setBody(rows);
        setError(false);
      },
      Err(_) {
        setError(true);
      },
    });
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          error={error}
          placeholder="!p"
          value={expression}
          spellCheck={false}
          blurOnSubmit={true}
          autoCapitalize="none"
          onChangeText={handleInput}
          onFocus={() => setDisplayKeyBoard(true)}
          onBlur={() => setDisplayKeyBoard(false)}
          onSubmitEditing={() => {
            setDisplayKeyBoard(false);
            generateTable();
          }}
          style={styles.input}
          onSelectionChange={(event) =>
            setCaretPosition(event.nativeEvent.selection.start)
          }
          right={
            headers.length !== 0 ? (
              <TextInput.Icon name="close" onPress={clearInput} />
            ) : (
              <TextInput.Icon name="arrow-right" onPress={generateTable} />
            )
          }
        />
        <Table headers={headers} colWidths={colWidths} body={body} />
      </View>

      {displayKeyBoard && (
        <View style={styles.keyboard}>
          {buttons.map((c, i) => (
            <Button
              key={i}
              mode="contained"
              style={styles.button}
              theme={{ roundness: 20 }}
              onPress={() => inputCharacter(c)}
            >
              {c}
            </Button>
          ))}
        </View>
      )}
    </>
  );
}

const Table = ({
  body,
  colWidths,
  headers,
}: {
  headers: string[];
  colWidths: number[];
  body: string[][];
}) => (
  <ScrollView style={styles.table}>
    <ScrollView horizontal={true}>
      <DataTable>
        <DataTable.Header style={{ borderBottomWidth: 0 }}>
          {headers.map((header, i) => {
            return (
              <DataTable.Title key={i} style={{ width: colWidths[i] }}>
                {header}
              </DataTable.Title>
            );
          })}
        </DataTable.Header>

        {body.map((row, i) => (
          <DataTable.Row key={i} style={{ borderBottomWidth: 0 }}>
            {row.map((cell, j) => (
              <DataTable.Cell key={j} style={{ width: colWidths[j] }}>
                {cell}
              </DataTable.Cell>
            ))}
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  table: {
    width: "90%",
  },
  keyboard: {
    bottom: 0,
    position: "absolute",
    width: "100%",
    paddingBottom: 5,
    paddingHorizontal: 10,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  button: {
    margin: 2,
    fontSize: "150%",
  },
  input: {
    width: "90%",
    marginVertical: 20,
    backgroundColor: "white",
  },
});
