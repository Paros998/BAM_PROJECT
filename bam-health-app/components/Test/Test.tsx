import React, { FC, useMemo, useState } from "react";
import { PatientTestResponse } from "@/interfaces/Api";
import { useCurrentUser } from "@/contexts/UserContext";
import {
  Box,
  Button,
  Text,
  useToast,
  VStack,
} from "@gluestack-ui/themed-native-base";
import Axios from "axios";
import { mapTestType } from "@/components/RecentTests/RecentTests";
import { Modal, TextInput } from "react-native";
import Logo from "@/components/Logo/Logo";

type TestProps = {
  test: PatientTestResponse;
};

const Test: FC<TestProps> = ({ test }) => {
  const { currentUser, isPending } = useCurrentUser();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [noteToView, setNoteToView] = useState<string | null>(null);
  const [noteToUpdate, setNoteToUpdate] = useState<string>("");
  const toast = useToast();

  const {
    testDate,
    type,
    id,
    bloodPressures,
    note,
    diabetesLevelCases,
    beatsPerMinute,
    patientId,
  } = test;

  const noteDisplay = useMemo<string | null>(() => {
    return noteToView ?? note;
  }, [note, noteToView]);

  const updateNote = async (newNote: string) => {
    try {
      setIsUpdating(true);

      await Axios.put(`/patient-tests/${id}`, { newNote: newNote });

      toast.show({
        title: "Updated note successfully",
      });

      setNoteToView(newNote);
      setModalVisible(!modalVisible);
    } catch (e: any) {
      toast.show({
        title: "Updated note failed",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending || !currentUser) {
    return;
  }

  return (
    <Box width={"100%"} backgroundColor={"dark.700"} padding={2}>
      <Text>Test: {mapTestType(type)}</Text>
      <Text>Date: {testDate}</Text>

      {type === "BLOOD_PRESSURE" && (
        <VStack alignItems="start" spacing={2}>
          <Text>Blood pressure</Text>
          {bloodPressures?.map((pressure, key) => (
            <Text key={key}>
              Case {pressure.testOrder}: {pressure.bloodPressureOn}/
              {pressure.bloodPressureTo}
            </Text>
          ))}
        </VStack>
      )}

      {type === "PULSE" && (
        <VStack alignItems="start" spacing={2}>
          <Text>Heart beats per minute:</Text>
          {beatsPerMinute?.map((beat, key) => <Text key={key}>{beat}</Text>)}
        </VStack>
      )}

      {type === "DIABETES" && (
        <VStack alignItems="start" spacing={2}>
          <Text>Sugar levels</Text>
          {diabetesLevelCases?.map((level, key) => (
            <Text key={key}>{level}</Text>
          ))}
        </VStack>
      )}

      {currentUser?.role === "PATIENT" && (
        <div>
          <Text mt={2}>
            {noteDisplay
              ? `Note from doctor: ${noteDisplay}`
              : "Note from doctor not added"}
          </Text>
        </div>
      )}

      {currentUser?.role === "DOCTOR" && (
        <VStack>
          {!noteDisplay ?? <Text mt={2}>Not added</Text>}

          {noteDisplay ?? (
            <TextInput
              multiline
              editable={false}
              maxLength={300}
              value={noteToUpdate}
              style={{
                color: "dark",
                backgroundColor: "white",
                padding: "2%",
                width: "90%",
                height: "20%",
                borderRadius: "5px",
              }}
              placeholder="Note to patient... "
            />
          )}

          <Button
            size={"xs"}
            marginTop={3}
            colorScheme={"rose"}
            onPress={() => {
              setNoteToUpdate(noteDisplay ?? "");
              setModalVisible(!modalVisible);
            }}
          >
            {noteDisplay ? "Edit note" : "Add note"}
          </Button>

          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <VStack
              alignItems="center"
              justifyContent="center"
              gap={5}
              height={"100%"}
              width={"100%"}
              backgroundColor="dark.800"
            >
              <Logo />

              <Text>
                Note: <br />
              </Text>

              <TextInput
                onChangeText={setNoteToUpdate}
                multiline
                editable
                maxLength={300}
                value={noteToUpdate}
                style={{
                  color: "dark",
                  backgroundColor: "white",
                  padding: "2%",
                  width: "90%",
                  height: "20%",
                  borderRadius: "5px",
                }}
                placeholder="Note to patient... "
              />

              <Button
                disabled={isUpdating}
                colorScheme={"indigo"}
                onPress={() => updateNote(noteToUpdate)}
              >
                Update note
              </Button>

              <Button
                disabled={isUpdating}
                onPress={() => setModalVisible(!modalVisible)}
              >
                Discard
              </Button>
            </VStack>
          </Modal>
        </VStack>
      )}
    </Box>
  );
};

export default Test;
