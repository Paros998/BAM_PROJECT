import React, { FC } from "react";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed-native-base";
import { useFetchData } from "@/hooks/useFetchData";
import { PatientTestResponse, TestType } from "@/interfaces/Api";
import CenteredSpinner from "@/components/CenteredSpinner/CenteredSpinner";

type RecentTestsProps = ViewStyle & {
  patientId: string;
};

function mapTestType(type: TestType): string {
  switch (type) {
    case "PULSE":
      return "Heart beat (pulse)";
    case "DIABETES":
      return "Diabetes (blood sugar)";
    case "BLOOD_PRESSURE":
      return "Blood pressure";
  }
}

const RecentTests: FC<RecentTestsProps> = ({ patientId, ...props }) => {
  const limit = 7;
  const [recentTests, , isPending] = useFetchData<PatientTestResponse[]>(
    `patient-tests/${patientId}/recent/${limit}`,
  );

  if (isPending) {
    return (
      <Box
        rounded="lg"
        p={5}
        bg={"indigo.500"}
        w={"90%"}
        justifyContent={"center"}
        alignItems={"center"}
        borderColor={"white"}
        borderWidth={1}
        {...props}
      >
        <Heading mb={1} color="light.50">
          Checking tests history
        </Heading>
        <CenteredSpinner isPending={isPending} />
      </Box>
    );
  }

  return (
    <Box
      rounded="lg"
      p={1}
      bg={"indigo.500"}
      w={"90%"}
      justifyContent={"center"}
      alignItems={"center"}
      borderColor={"white"}
      borderWidth={1}
      {...props}
    >
      <Heading mb={2} color="light.50">
        {recentTests?.length === 0 ? `No recent tests taken.` : `My history`}
      </Heading>

      {recentTests?.length > 0 && (
        <VStack gap={3} w={"100%"} alignItems={"center"} color="indigo.100">
          {recentTests.map((test, i) => (
            <Box key={i} w={"90%"} rounded="sm" p={3} bg={"dark.800"} px={2}>
              <HStack gap={2} justifyContent={"space-between"}>
                <VStack>
                  <Text>Test {mapTestType(test.type)},</Text>
                  <Text>taken on {test.testDate}</Text>
                </VStack>

                <Button rounded={"xl"} colorScheme={"info"} size={"sm"}>
                  More
                </Button>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default RecentTests;
