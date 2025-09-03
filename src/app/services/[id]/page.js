"use client";
import React from "react";
import { useSelector } from "react-redux";
// import PaidSocial from "../../services/PaidSocial";
// import PaidAds from "../../services/PaidAds";
// import SEO from "../../services/SEO";
// import ContentMarketing from "../../services/ContentMarketing";
// import DigitalPR from "../../services/DigitalPR";
// import OrganicSocialMedia from "../../services/OrganicSocialMedia";
// import AmazonMarketing from "../../services/AmazonMarketing";
// import CreativeAndDesign from "../../services/CreativeAndDesign";
// import EmailMarketing from "../../services/EmailMarketing";
// import { useParams, useNavigate } from "react-router-dom";
import { useParams, useRouter } from "next/navigation";
import PaidSocial from "@/components/services/PaidSocial";
import PaidAds from "@/components/services/PaidAds";
import SEO from "@/components/services/SEO";
import ContentMarketing from "@/components/services/ContentMarketing";
import DigitalPR from "@/components/services/DigitalPR";
import OrganicSocialMedia from "@/components/services/OrganicSocialMedia";
import CreativeAndDesign from "@/components/services/CreativeAndDesign";
import AmazonMarketing from "@/components/services/AmazonMarketing";

const ServicePage = () => {
  //   const { id } = useParams();
  const { id } = useParams(); // just like react-router
  const router = useRouter();
  const selectedServices = useSelector(
    (state) => state.services.selectedServices
  );
  //   const navigate = useNavigate();
  const index = selectedServices.findIndex((service) => service.id === id);
  const nextService = selectedServices[index + 1]?.id;

  const renderServiceComponent = () => {
    switch (id) {
      case "1":
        return <PaidSocial nextService={nextService} />;
      case "2":
        return <PaidAds nextService={nextService} />;
      case "3":
        return <SEO nextService={nextService} />;
      case "4":
        return <ContentMarketing nextService={nextService} />;
      case "5":
        return <DigitalPR nextService={nextService} />;
      case "6":
        return <OrganicSocialMedia nextService={nextService} />;
      case "7":
        return <AmazonMarketing nextService={nextService} />;
      case "8":
        return <CreativeAndDesign nextService={nextService} />;

      default:
        return null;
    }
  };

  return (
    <div>
      <>{renderServiceComponent()}</>
    </div>
  );
};

export default ServicePage;
