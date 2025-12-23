import type React from "react";
import type { FeatureSectionProps } from "../../types/types";
import HowItWorksSection from "./HowItWorksSection";
import MobileReportSection from "./MobileReportSection";
import DesktopReportSection from "./DesktopReportSection";

const FeatureSection: React.FC<FeatureSectionProps> = ({
  featuresRef,
  featureMobileRef,
  featureDesktopRef,
}) => {
  return (
    <>
      <HowItWorksSection featuresRef={featuresRef} />
      <MobileReportSection featureMobileRef={featureMobileRef} />
      <DesktopReportSection featureDesktopRef={featureDesktopRef} />
    </>
  );
};

export default FeatureSection;
