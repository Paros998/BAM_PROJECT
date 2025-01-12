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
import { Modal } from "react-native";

type TestProps = {
  test: PatientTestResponse;
};

const Test: FC<TestProps> = ({ test }) => {
  const { currentUser, isPending } = useCurrentUser();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [noteToView, setNoteToView] = useState<string | null>(null);
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
        title: "Updating note successfully",
      });

      setNoteToView(newNote);
    } catch (e: any) {
      toast.show({
        title: "Updating note failed",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending || !currentUser) {
    return;
  }

  return (
    <Box width={"100%"}>
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

      {currentUser?.role !== "DOCTOR" && (
        <Text mt={2}>Note from doctor: {noteDisplay ?? "Not added"}</Text>
      )}

      {currentUser?.role === "DOCTOR" && (
        <VStack>
          <Text mt={2}>Note : {noteDisplay ?? "Not added"}</Text>

          <Button size={"xs"} onPress={() => setModalVisible(!modalVisible)}>
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
              justifyContent="space-around"
              spacing={2}
              height={"100%"}
              width={"100%"}
              backgroundColor={"grey"}
            >
              <Text>
                Note: <br />
                {noteDisplay}
              </Text>

              <Button onPress={() => setModalVisible(!modalVisible)}>
                Hide Modal
              </Button>
            </VStack>
          </Modal>
        </VStack>
      )}
    </Box>
  );
};

export default Test;
