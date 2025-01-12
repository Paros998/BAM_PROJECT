import React, { FC, useState } from "react";
import { AssignedPatient } from "@/interfaces/Api";
import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed-native-base";
import Test from "@/components/Test/Test";

type AssignedPatientProps = {
  patient: AssignedPatient;
};

const DoctorAssignedPatient: FC<AssignedPatientProps> = ({ patient }) => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const { patientId, fullName, phoneNumber, nationalId, age, patientTests } =
    patient;

  return (
    <Box
      mx={2}
      backgroundColor="indigo.500"
      p={2}
      rounded="lg"
      borderColor={"light.50"}
      borderWidth={1}
      width={"90%"}
    >
      <VStack alignItems={"start"} justifyContent={"space-around"} gap={1}>
        <Text>Patient: {fullName}</Text>
        <Text>Age: {age}</Text>
        <Text>Phone number: {phoneNumber}</Text>
        <Text>ID: {nationalId}</Text>
        <HStack
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={1}
          width={"100%"}
        >
          <Text>Tests available: {patientTests.length > 0 ? "Yes" : "No"}</Text>
          <Button
            size={"sm"}
            variant={"link"}
            onPress={() => setDropdownOpen(!isDropdownOpen)}
          >
            {isDropdownOpen ? "Hide" : "Check more"}
          </Button>
        </HStack>

        {isDropdownOpen && (
          <Box
            rounded="lg"
            borderColor={"light.50"}
            borderWidth={1}
            padding={2}
            width={"100%"}
          >
            <VStack
              width={"100%"}
              alignItems={"start"}
              justifyContent={"space-around"}
              gap={2}
            >
              {patientTests.map((test, key) => (
                <Test key={key} test={test} />
              ))}
            </VStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default DoctorAssignedPatient;
