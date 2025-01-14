import React, { FC } from "react";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { Box, Heading, VStack } from "@gluestack-ui/themed-native-base";
import { useFetchData } from "@/hooks/useFetchData";
import { PatientTestResponse, TestType } from "@/interfaces/Api";
import CenteredSpinner from "@/components/CenteredSpinner/CenteredSpinner";
import Test from "@/components/Test/Test";

type RecentTestsProps = ViewStyle & {
  patientId: string;
};

export function mapTestType(type: TestType): string {
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
  const limit = 15;
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
        margin={"auto"}
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
      margin={"auto"}
      marginBottom={10}
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
              <Test test={test} />
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default RecentTests;
