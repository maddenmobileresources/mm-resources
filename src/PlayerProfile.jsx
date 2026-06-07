import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTheme } from "./context/ThemeContext";
import PlayerComments from "./PlayerComments";

const rarityColors = {
  "Starter": "bg-[#c2fff5] border-[#c2fff5]",
  "Uncommon": "bg-[#b1ffb1] border-[#b1ffb1]",
  "Rare": "bg-[#a4d3ff] border-[#a4d3ff]",
  "Epic": "bg-[#d8adff] border-[#d8adff]",
  "Iconic": "bg-[#cfcea0] border-[#cfcea0]",
  "Mythic": "bg-[#e4e4e4] border-[#e4e4e4]",
  "Marvel": "bg-[#ff8484] border-[#ff8484]"
};

const traitTierColors = {
  "V": "bg-[#a8b6db] border-[#a8b6db]",    // Mythic color for tier V
  "IV": "bg-[#cfcea0] border-[#cfcea0]",   // Iconic color for tier IV
  "III": "bg-[#d8adff] border-[#d8adff]",  // Epic color for tier III
  "II": "bg-[#a4d3ff] border-[#a4d3ff]",   // Rare color for tier II
  "I": "bg-[#b1ffb1] border-[#b1ffb1]"     // Uncommon color for tier I
};

// Add this helper function after traitTierColors
const getTraitTierColor = (traitName) => {
  // Check if trait ends with Roman numeral
  if (traitName.endsWith(" V")) return traitTierColors["V"];
  if (traitName.endsWith(" IV")) return traitTierColors["IV"];
  if (traitName.endsWith(" III")) return traitTierColors["III"];
  if (traitName.endsWith(" II")) return traitTierColors["II"];
  if (traitName.endsWith(" I")) return traitTierColors["I"];
  
  // Default to white if no tier found (for custom traits without tiers)
  return "bg-white border-gray-300";
};

const STAT_GROUPS = [
  { label: "Quickness", stats: ["Speed", "Acceleration"] },
  { label: "Physical", stats: ["Strength", "Agility", "Jump", "Elusiveness"] },
  { label: "Mental", stats: ["Awareness", "Ball Carrier Vision", "Play Recognition"] },
  { label: "Passing", stats: ["Play Action", "Throw on Run", "Throw Power", "Throw Acc Short", "Throw Acc Mid", "Throw Acc Deep"] },
  { label: "Receiving", stats: ["Release", "Route Running", "Catch", "Catch In Traffic", "Spectacular Catch"] },
  { label: "Rushing", stats: ["Carry", "Trucking", "Spin Move", "Juke Move", "Stiff Arm"] },
  { label: "Blocking", stats: ["Impact Block", "Run Block", "Pass Block"] },
  { label: "Coverage", stats: ["Press", "Man Coverage", "Zone Coverage"] },
  { label: "Pass Rush", stats: ["Block Shedding", "Finesse Moves", "Power Moves"] },
  { label: "Run Stop", stats: ["Tackle", "Hit Power", "Pursuit"] },
  { label: "Kicking", stats: ["Kick Power", "Kick Accuracy"] },
  { label: "Returning", stats: ["Kick Return"] }
];

// Trait definitions with icons and descriptions
const TRAIT_DATA = {
  "Bruiser V": {
    icon: "https://i.imgur.com/TwU5afg.png",
    description: "Ball carrier stiff arm, truck, and break tackle success significantly increased."
  },
  "Ballhawk V": {
    icon: "https://i.imgur.com/RXD6ZPz.png",
    description: "Interception chance for defensive backs and linebackers significantly increased."
  },
  "Quick Cuts V": {
    icon: "https://i.imgur.com/UugVuWQ.png",
    description: "Increase QB, HB, FB, WR, TE Agility by +5."
  },
  "Pocket Intel V": {
    icon: "https://i.imgur.com/iOKmqsY.png",
    description: "Increase LB, MLB, CB, S Man Coverage and Zone Coverage by +5."
  },
  "Sure Hands V": {
    icon: "https://i.imgur.com/GTO2vyi.png",
    description: "Increase HB, FB, TE, WR Catch and Catch In Traffic by +5."
  },
  "Flapjack V": {
    icon: "https://i.imgur.com/O9tET5F.png",
    description: "Overall blocking success significantly increased."
  },
  "Punisher V": {
    icon: "https://i.imgur.com/9ldwBfZ.png",
    description: "Big hit frequency significantly increased."
  },
  "Edge Threat V": {
    icon: "https://i.imgur.com/ldPRMeT.png",
    description: "Block shed chance by Defensive End significantly increased."
  },
  "Edge Protector V": {
    icon: "https://i.imgur.com/rMYokjZ.png",
    description: "Block success by Offensive Tackle significantly increased."
  },
  "Run Protector V": {
    icon: "https://i.imgur.com/dQEQAcN.png",
    description: "Block success on run plays significantly increased."
  },
  "Pass Protector V": {
    icon: "https://i.imgur.com/Otsl8J8.png",
    description: "Block success on pass plays significantly increased."
  },
  "Run Crusher V": {
    icon: "https://i.imgur.com/6X8l71q.png",
    description: "Chance to cause fumbles on run plays significantly increased."
  },
  "Catch Crusher V": {
    icon: "https://i.imgur.com/rw28sik.png",
    description: "Chance to cause incompletion on hit significantly increased."
  },
  "Shedder V": {
    icon: "https://i.imgur.com/kbKEFkn.png",
    description: "Block shed success significantly increased."
  },
  "Swat Team V": {
    icon: "https://i.imgur.com/e1iRVfW.png",
    description: "Chance to knock down passes significantly increased."
  },
  "Fearless V": {
    icon: "https://i.imgur.com/54fgELm.png",
    description: "Chance to catch and hang onto ball in traffic significantly increased."
  },
  "Stonewall V": {
    icon: "https://i.imgur.com/qTBvVKj.png",
    description: "Tackle success significantly increased."
  },
  "Tiptoes V": {
    icon: "https://i.imgur.com/mxUgjEh.png",
    description: "Chance to keep feet in on catch near sideline significantly increased."
  },
  "Wrapped Up V": {
    icon: "https://i.imgur.com/QU1SGsm.png",
    description: "Chance to successfully wrap tackle ball carrier significantly increased."
  },
  "Goal Line General V": {
    icon: "https://i.imgur.com/cvqVlWs.png",
    description: "Significant chance to increase overall offensive ability on goal line."
  },
  "Clutch Passer V": {
    icon: "https://i.imgur.com/pRWwZdh.png",
    description: "Significant chance to increase passing success on 4th down pass plays."
  },
  "Headstarter V": {
    icon: "https://i.imgur.com/UhomSV9.png",
    description: "Significant chance to increase passing success on 1st down pass plays."
  },
  "Red Zone Raider V": {
    icon: "https://i.imgur.com/RA6gjsY.png",
    description: "Significant chance to increase overall offensive ability within the Red Zone."
  },
  "Red Zone Guardian V": {
    icon: "https://i.imgur.com/WuILN3m.png",
    description: "Significant chance to increase overall defensive ability within the Red Zone."
  },
  "Bruiser IV": {
    icon: "https://i.imgur.com/yK9EjwH.png",
    description: "Ball carrier stiff arm, truck, and break tackle success greatly increased."
  },
  "Ballhawk IV": {
    icon: "https://i.imgur.com/mCeGwdb.png",
    description: "Interception chance for defensive backs and linebackers greatly increased."
  },
  "Quick Cuts IV": {
    icon: "https://i.imgur.com/WxrCZ4v.png",
    description: "Increase QB, HB, FB, WR, TE Agility by +4."
  },
  "Pocket Intel IV": {
    icon: "https://i.imgur.com/siqfz0R.png",
    description: "Increase LB, MLB, CB, S Man Coverage and Zone Coverage by +4."
  },
  "Sure Hands IV": {
    icon: "https://i.imgur.com/He9z2RN.png",
    description: "Increase HB, FB, TE, WR Catch and Catch In Traffic by +4."
  },
  "Flapjack IV": {
    icon: "https://i.imgur.com/oyXK4wH.png",
    description: "Overall blocking success greatly increased."
  },
  "Punisher IV": {
    icon: "https://i.imgur.com/TL2rxfI.png",
    description: "Big hit frequency greatly increased."
  },
  "Edge Threat IV": {
    icon: "https://i.imgur.com/2OO5MdW.png",
    description: "Block shed chance by Defensive End greatly increased."
  },
  "Edge Protector IV": {
    icon: "https://i.imgur.com/UlygmNI.png",
    description: "Block success by Offensive Tackle greatly increased."
  },
  "Run Protector IV": {
    icon: "https://i.imgur.com/mJMgNfO.png",
    description: "Block success on run plays greatly increased."
  },
  "Pass Protector IV": {
    icon: "https://i.imgur.com/YakoDFw.png",
    description: "Block success on pass plays greatly increased."
  },
  "Run Crusher IV": {
    icon: "https://i.imgur.com/DVDxRcO.png",
    description: "Chance to cause fumbles on run plays greatly increased."
  },
  "Catch Crusher IV": {
    icon: "https://i.imgur.com/MgrtJAQ.png",
    description: "Chance to cause incompletion on hit greatly increased."
  },
  "Shedder IV": {
    icon: "https://i.imgur.com/mVLbsS7.png",
    description: "Block shed success greatly increased."
  },
  "Swat Team IV": {
    icon: "https://i.imgur.com/9DZVJ7Q.png",
    description: "Chance to knock down passes greatly increased."
  },
  "Fearless IV": {
    icon: "https://i.imgur.com/wPQ5OmN.png",
    description: "Chance to catch and hang onto ball in traffic greatly increased."
  },
  "Stonewall IV": {
    icon: "https://i.imgur.com/GcgPkVE.png",
    description: "Tackle success greatly increased."
  },
  "Tiptoes IV": {
    icon: "https://i.imgur.com/yHiTYZd.png",
    description: "Chance to keep feet in on catch near sideline greatly increased."
  },
  "Wrapped Up IV": {
    icon: "https://i.imgur.com/TptpXnF.png",
    description: "Chance to successfully wrap tackle ball carrier greatly increased."
  },
  "Goal Line General IV": {
    icon: "https://i.imgur.com/j4tMkdn.png",
    description: "Great chance to increase overall offensive ability on goal line."
  },
  "Clutch Passer IV": {
    icon: "https://i.imgur.com/ZpJhJd2.png",
    description: "Great chance to increase passing success on 4th down pass plays."
  },
  "Headstarter IV": {
    icon: "https://i.imgur.com/JC5wbA7.png",
    description: "Great chance to increase passing success on 1st down pass plays."
  },
  "Red Zone Raider IV": {
    icon: "https://i.imgur.com/YTN0qLM.png",
    description: "Great chance to increase overall offensive ability within the Red Zone."
  },
  "Red Zone Guardian IV": {
    icon: "https://i.imgur.com/rHzYu7V.png",
    description: "Great chance to increase overall defensive ability within the Red Zone."
  },
  "Bruiser III": {
    icon: "https://i.imgur.com/5M1ruJk.png",
    description: "Ball carrier stiff arm, truck, and break tackle success increased."
  },
  "Ballhawk III": {
    icon: "https://i.imgur.com/5uZ76ZI.png",
    description: "Interception chance for defensive backs and linebackers increased."
  },
  "Quick Cuts III": {
    icon: "https://i.imgur.com/NDCl0Cf.png",
    description: "Increase QB, HB, FB, WR, TE Agility by +3."
  },
  "Pocket Intel III": {
    icon: "https://i.imgur.com/wAACDYk.png",
    description: "Increase LB, MLB, CB, S Man Coverage and Zone Coverage by +3."
  },
  "Sure Hands III": {
    icon: "https://i.imgur.com/EbaPrYo.png",
    description: "Increase HB, FB, TE, WR Catch and Catch In Traffic by +3."
  },
  "Flapjack III": {
    icon: "https://i.imgur.com/BcNPVci.png",
    description: "Overall blocking success increased."
  },
  "Punisher III": {
    icon: "https://i.imgur.com/njPAt51.png",
    description: "Big hit frequency increased."
  },
  "Edge Threat III": {
    icon: "https://i.imgur.com/EbiNUbR.png",
    description: "Block shed chance by Defensive End increased."
  },
  "Edge Protector III": {
    icon: "https://i.imgur.com/UdFb38Z.png",
    description: "Block success by Offensive Tackle increased."
  },
  "Run Protector III": {
    icon: "https://i.imgur.com/MzK1ARK.png",
    description: "Block success on run plays increased."
  },
  "Pass Protector III": {
    icon: "https://i.imgur.com/zaX929m.png",
    description: "Block success on pass plays increased."
  },
  "Run Crusher III": {
    icon: "https://i.imgur.com/YdGNHJ6.png",
    description: "Chance to cause fumbles on run plays increased."
  },
  "Catch Crusher III": {
    icon: "https://i.imgur.com/7WPUDLB.png",
    description: "Chance to cause incompletion on hit increased."
  },
  "Shedder III": {
    icon: "https://i.imgur.com/5AXXBMY.png",
    description: "Block shed success increased."
  },
  "Swat Team III": {
    icon: "https://i.imgur.com/2LGuerd.png",
    description: "Chance to knock down passes increased."
  },
  "Fearless III": {
    icon: "https://i.imgur.com/tiTCWgG.png",
    description: "Chance to catch and hang onto ball in traffic increased."
  },
  "Stonewall III": {
    icon: "https://i.imgur.com/CDI13K6.png",
    description: "Tackle success increased."
  },
  "Tiptoes III": {
    icon: "https://i.imgur.com/QrITDyk.png",
    description: "Chance to keep feet in on catch near sideline increased."
  },
  "Wrapped Up III": {
    icon: "https://i.imgur.com/79Q8ODG.png",
    description: "Chance to successfully wrap tackle ball carrier increased."
  },
  "Goal Line General III": {
    icon: "https://i.imgur.com/M2XrtvM.png",
    description: "Chance to increase overall offensive ability on goal line."
  },
  "Clutch Passer III": {
    icon: "https://i.imgur.com/NTnpxfa.png",
    description: "Chance to increase passing success on 4th down pass plays."
  },
  "Headstarter III": {
    icon: "https://i.imgur.com/0tUvARR.png",
    description: "Chance to increase passing success on 1st down pass plays."
  },
  "Red Zone Raider III": {
    icon: "https://i.imgur.com/Answ2I4.png",
    description: "Chance to increase overall offensive ability within the Red Zone."
  },
  "Red Zone Guardian III": {
    icon: "https://i.imgur.com/uiK84Rs.png",
    description: "Chance to increase overall defensive ability within the Red Zone."
  },
  "Bruiser II": {
    icon: "https://i.imgur.com/dboekRU.png",
    description: "Ball carrier stiff arm, truck, and break tackle success moderately increased."
  },
  "Ballhawk II": {
    icon: "https://i.imgur.com/YAY4eUI.png",
    description: "Interception chance for defensive backs and linebackers moderately increased."
  },
  "Quick Cuts II": {
    icon: "https://i.imgur.com/spd72OY.png",
    description: "Increase QB, HB, FB, WR, TE Agility by +2."
  },
  "Pocket Intel II": {
    icon: "https://i.imgur.com/Nnw2aut.png",
    description: "Increase LB, MLB, CB, S Man Coverage and Zone Coverage by +2."
  },
  "Sure Hands II": {
    icon: "https://i.imgur.com/XfEZsL2.png",
    description: "Increase HB, FB, TE, WR Catch and Catch In Traffic by +2."
  },
  "Flapjack II": {
    icon: "https://i.imgur.com/twg269n.png",
    description: "Overall blocking success moderately increased."
  },
  "Punisher II": {
    icon: "https://i.imgur.com/blSR72U.png",
    description: "Big hit frequency moderately increased."
  },
  "Edge Threat II": {
    icon: "https://i.imgur.com/sSHSYLn.png",
    description: "Block shed chance by Defensive End moderately increased."
  },
  "Edge Protector II": {
    icon: "https://i.imgur.com/AEduCRq.png",
    description: "Block success by Offensive Tackle moderately increased."
  },
  "Run Protector II": {
    icon: "https://i.imgur.com/XoxKg33.png",
    description: "Block success on run plays moderately increased."
  },
  "Pass Protector II": {
    icon: "https://i.imgur.com/WrDlF8M.png",
    description: "Block success on pass plays moderately increased."
  },
  "Run Crusher II": {
    icon: "https://i.imgur.com/qsGU6Iu.png",
    description: "Chance to cause fumbles on run plays moderately increased."
  },
  "Catch Crusher II": {
    icon: "https://i.imgur.com/ELPFEFP.png",
    description: "Chance to cause incompletion on hit moderately increased."
  },
  "Shedder II": {
    icon: "https://i.imgur.com/kRiOBQx.png",
    description: "Block shed success moderately increased."
  },
  "Swat Team II": {
    icon: "https://i.imgur.com/NWhk1zq.png",
    description: "Chance to knock down passes moderately increased."
  },
  "Fearless II": {
    icon: "https://i.imgur.com/p2QcpQN.png",
    description: "Chance to catch and hang onto ball in traffic moderately increased."
  },
  "Stonewall II": {
    icon: "https://i.imgur.com/1s0FlNm.png",
    description: "Tackle success moderately increased."
  },
  "Tiptoes II": {
    icon: "https://i.imgur.com/gbVExiW.png",
    description: "Chance to keep feet in on catch near sideline moderately increased."
  },
  "Wrapped Up II": {
    icon: "https://i.imgur.com/imzhfes.png",
    description: "Chance to successfully wrap tackle ball carrier moderately increased."
  },
  "Goal Line General II": {
    icon: "https://i.imgur.com/AHcA8Ip.png",
    description: "Moderate chance to increase overall offensive ability on goal line."
  },
  "Clutch Passer II": {
    icon: "https://i.imgur.com/DYaXxuz.png",
    description: "Moderate chance to increase passing success on 4th down pass plays."
  },
  "Headstarter II": {
    icon: "https://i.imgur.com/K5KGbW5.png",
    description: "Moderate chance to increase passing success on 1st down pass plays."
  },
  "Red Zone Raider II": {
    icon: "https://i.imgur.com/OtDLBSt.png",
    description: "Moderate chance to increase overall offensive ability within the Red Zone."
  },
  "Red Zone Guardian II": {
    icon: "https://i.imgur.com/Y54CnVv.png",
    description: "Moderate chance to increase overall defensive ability within the Red Zone."
  },
  "Bruiser I": {
    icon: "https://i.imgur.com/VniEPyB.png",
    description: "Ball carrier stiff arm, truck, and break tackle success slightly increased."
  },
  "Ballhawk I": {
    icon: "https://i.imgur.com/jRUsH3L.png",
    description: "Interception chance for defensive backs and linebackers slightly increased."
  },
  "Quick Cuts I": {
    icon: "https://i.imgur.com/lAWE6JP.png",
    description: "Increase QB, HB, FB, WR, TE Agility by +1."
  },
  "Pocket Intel I": {
    icon: "https://i.imgur.com/njUCv5w.png",
    description: "Increase LB, MLB, CB, S Man Coverage and Zone Coverage by +1."
  },
  "Sure Hands I": {
    icon: "https://i.imgur.com/ip6o08B.png",
    description: "Increase HB, FB, TE, WR Catch and Catch In Traffic by +1."
  },
  "Flapjack I": {
    icon: "https://i.imgur.com/TjeBFn7.png",
    description: "Overall blocking success slightly increased."
  },
  "Punisher I": {
    icon: "https://i.imgur.com/0phfb3r.png",
    description: "Big hit frequency slightly increased."
  },
  "Edge Threat I": {
    icon: "https://i.imgur.com/GIgwgye.png",
    description: "Block shed chance by Defensive End slightly increased."
  },
  "Edge Protector I": {
    icon: "https://i.imgur.com/IOxTyl4.png",
    description: "Block success by Offensive Tackle slightly increased."
  },
  "Run Protector I": {
    icon: "https://i.imgur.com/1k4Rbhi.png",
    description: "Block success on run plays slightly increased."
  },
  "Pass Protector I": {
    icon: "https://i.imgur.com/nBJ2zHk.png",
    description: "Block success on pass plays slightly increased."
  },
  "Run Crusher I": {
    icon: "https://i.imgur.com/1PhVse3.png",
    description: "Chance to cause fumbles on run plays slightly increased."
  },
  "Catch Crusher I": {
    icon: "https://i.imgur.com/44ANNlR.png",
    description: "Chance to cause incompletion on hit slightly increased."
  },
  "Shedder I": {
    icon: "https://i.imgur.com/jkm7syo.png",
    description: "Block shed success slightly increased."
  },
  "Swat Team I": {
    icon: "https://i.imgur.com/oMxgR36.png",
    description: "Chance to knock down passes slightly increased."
  },
  "Fearless I": {
    icon: "https://i.imgur.com/zVZnGnS.png",
    description: "Chance to catch and hang onto ball in traffic slightly increased."
  },
  "Stonewall I": {
    icon: "https://i.imgur.com/35BbkGD.png",
    description: "Tackle success slightly increased."
  },
  "Tiptoes I": {
    icon: "https://i.imgur.com/F1ZT9gC.png",
    description: "Chance to keep feet in on catch near sideline slightly increased."
  },
  "Wrapped Up I": {
    icon: "https://i.imgur.com/ajk7ls5.png",
    description: "Chance to successfully wrap tackle ball carrier slightly increased."
  },
  "Goal Line General I": {
    icon: "https://i.imgur.com/c1WThrG.png",
    description: "Slight chance to increase overall offensive ability on goal line."
  },
  "Clutch Passer I": {
    icon: "https://i.imgur.com/e67FFpf.png",
    description: "Slight chance to increase passing success on 4th down pass plays."
  },
  "Headstarter I": {
    icon: "https://i.imgur.com/KoUxJvA.png",
    description: "Slight chance to increase passing success on 1st down pass plays."
  },
  "Red Zone Raider I": {
    icon: "https://i.imgur.com/585qdhK.png",
    description: "Slight chance to increase overall offensive ability within the Red Zone."
  },
  "Red Zone Guardian I": {
    icon: "https://i.imgur.com/5IM9Tyj.png",
    description: "Slight chance to increase overall defensive ability within the Red Zone."
  },
  "Underworld Aura I": {
    icon: "https://i.imgur.com/dhUFXXw.png",
    description: "Increase Vamp Bailey's OVR +1."
  },
  "Underworld Aura II": {
    icon: "https://i.imgur.com/0T5zGYM.png",
    description: "Increase Vamp Bailey's OVR +1.5."
  },
  "Underworld Aura III": {
    icon: "https://i.imgur.com/0jsCe8a.png",
    description: "Increase Vamp Bailey's OVR +2."
  },
  "Underworld Aura IV": {
    icon: "https://i.imgur.com/qlPXzyI.png",
    description: "Increase Vamp Bailey's OVR +2.5."
  },
  "Underworld Aura V": {
    icon: "https://i.imgur.com/7MkZCt8.png",
    description: "Increase Vamp Bailey's OVR +3."
  },
    "Transformation Aura I": {
    icon: "https://i.imgur.com/YTPkqFq.png",
    description: "Increase Calvin Johnson's OVR +1."
  },
  "Transformation Aura II": {
    icon: "https://i.imgur.com/9YLY6rx.png",
    description: "Increase Calvin Johnson's OVR +1.5."
  },
  "Transformation Aura III": {
    icon: "https://i.imgur.com/Qnv4C3X.png",
    description: "Increase Calvin Johnson's OVR +2."
  },
  "Transformation Aura IV": {
    icon: "https://i.imgur.com/zkjYeH1.png",
    description: "Increase Calvin Johnson's OVR +2.5."
  },
  "Transformation Aura V": {
    icon: "https://i.imgur.com/DtPsGxm.png",
    description: "Increase Calvin Johnson's OVR +3."
  },
      "Blitzmas Aura I": {
    icon: "https://i.imgur.com/vIsjXx2.png",
    description: "Increase Blitz The Elf's OVR +1."
  },
  "Blitzmas Aura II": {
    icon: "https://i.imgur.com/kMkHpol.png",
    description: "Increase Blitz The Elf's OVR +1.5."
  },
  "Blitzmas Aura III": {
    icon: "https://i.imgur.com/TLYzKcG.png",
    description: "Increase Blitz The Elf's OVR +2."
  },
  "Blitzmas Aura IV": {
    icon: "https://i.imgur.com/6HUOIAJ.png",
    description: "Increase Blitz The Elf's OVR +2.5."
  },
  "Blitzmas Aura V": {
    icon: "https://i.imgur.com/9vjg8YL.png",
    description: "Increase Blitz The Elf's OVR +3."
  },
};

// Position + Rarity to traits mapping
const POSITION_RARITY_TRAITS = {
  // QB Traits
  "QB-Uncommon": ["Goal Line General I", "Clutch Passer I", "Headstarter I", "Red Zone Raider I"],
  "QB-Rare": ["Goal Line General II", "Clutch Passer II", "Headstarter II", "Red Zone Raider II", "Goal Line General I", "Clutch Passer I", "Headstarter I", "Red Zone Raider I"],
  "QB-Epic": ["Goal Line General III", "Clutch Passer III", "Headstarter III", "Red Zone Raider III", "Goal Line General II", "Clutch Passer II", "Headstarter II", "Red Zone Raider II", "Goal Line General I", "Clutch Passer I", "Headstarter I", "Red Zone Raider I"],
  "QB-Iconic": ["Goal Line General IV", "Clutch Passer IV", "Headstarter IV", "Red Zone Raider IV", "Goal Line General III", "Clutch Passer III", "Headstarter III", "Red Zone Raider III", "Goal Line General II", "Clutch Passer II", "Headstarter II", "Red Zone Raider II", "Goal Line General I", "Clutch Passer I", "Headstarter I", "Red Zone Raider I"],
  "QB-Mythic": ["Goal Line General V", "Clutch Passer v", "Headstarter V", "Red Zone Raider V", "Goal Line General IV", "Clutch Passer IV", "Headstarter IV", "Red Zone Raider IV", "Goal Line General III", "Clutch Passer III", "Headstarter III", "Red Zone Raider III", "Goal Line General II", "Clutch Passer II", "Headstarter II", "Red Zone Raider II", "Goal Line General I", "Clutch Passer I", "Headstarter I", "Red Zone Raider I"],
  "QB-Marvel": ["Goal Line General V", "Clutch Passer v", "Headstarter V", "Red Zone Raider V", "Goal Line General IV", "Clutch Passer IV", "Headstarter IV", "Red Zone Raider IV", "Goal Line General III", "Clutch Passer III", "Headstarter III", "Red Zone Raider III", "Goal Line General II", "Clutch Passer II", "Headstarter II", "Red Zone Raider II", "Goal Line General I", "Clutch Passer I", "Headstarter I", "Red Zone Raider I"],
  
  // HB Traits
  "HB-Uncommon": ["Bruiser I", "Flapjack I", "Run Protector I", "Pass Protector I", "Fearless I", "Tiptoes I"],
  "HB-Rare": ["Bruiser II", "Flapjack II", "Run Protector II", "Pass Protector II", "Fearless II", "Tiptoes II", "Bruiser I", "Flapjack I", "Run Protector I", "Pass Protector I", "Fearless I", "Tiptoes I"],
  "HB-Epic": ["Bruiser III", "Flapjack III", "Run Protector III", "Pass Protector III", "Fearless III", "Tiptoes III", "Bruiser II", "Flapjack II", "Run Protector II", "Pass Protector II", "Fearless II", "Tiptoes II", "Bruiser I", "Flapjack I", "Run Protector I", "Pass Protector I", "Fearless I", "Tiptoes I"],
  "HB-Iconic": ["Bruiser IV", "Flapjack IV", "Run Protector IV", "Pass Protector IV", "Fearless IV", "Tiptoes IV", "Bruiser III", "Flapjack III", "Run Protector III", "Pass Protector III", "Fearless III", "Tiptoes III", "Bruiser II", "Flapjack II", "Run Protector II", "Pass Protector II", "Fearless II", "Tiptoes II", "Bruiser I", "Flapjack I", "Run Protector I", "Pass Protector I", "Fearless I", "Tiptoes I"],
  "HB-Mythic": ["Bruiser V", "Flapjack V", "Run Protector V", "Pass Protector V", "Fearless V", "Tiptoes V", "Bruiser IV", "Flapjack IV", "Run Protector IV", "Pass Protector IV", "Fearless IV", "Tiptoes IV", "Bruiser III", "Flapjack III", "Run Protector III", "Pass Protector III", "Fearless III", "Tiptoes III", "Bruiser II", "Flapjack II", "Run Protector II", "Pass Protector II", "Fearless II", "Tiptoes II", "Bruiser I", "Flapjack I", "Run Protector I", "Pass Protector I", "Fearless I", "Tiptoes I"],
  "HB-Marvel": ["Bruiser V", "Flapjack V", "Run Protector V", "Pass Protector V", "Fearless V", "Tiptoes V", "Bruiser IV", "Flapjack IV", "Run Protector IV", "Pass Protector IV", "Fearless IV", "Tiptoes IV", "Bruiser III", "Flapjack III", "Run Protector III", "Pass Protector III", "Fearless III", "Tiptoes III", "Bruiser II", "Flapjack II", "Run Protector II", "Pass Protector II", "Fearless II", "Tiptoes II", "Bruiser I", "Flapjack I", "Run Protector I", "Pass Protector I", "Fearless I", "Tiptoes I"],

  // FB Traits
  "FB-Uncommon": ["Bruiser I", "Flapjack I", "Run Protector I", "Pass Protector I", "Fearless I", "Tiptoes I"],
  "FB-Rare": ["Bruiser II", "Flapjack II", "Run Protector II", "Pass Protector II", "Fearless II", "Tiptoes II", "Bruiser I", "Flapjack I", "Run Protector I", "Pass Protector I", "Fearless I", "Tiptoes I"],
  "FB-Epic": ["Bruiser III", "Flapjack III", "Run Protector III", "Pass Protector III", "Fearless III", "Tiptoes III", "Bruiser II", "Flapjack II", "Run Protector II", "Pass Protector II", "Fearless II", "Tiptoes II", "Bruiser I", "Flapjack I", "Run Protector I", "Pass Protector I", "Fearless I", "Tiptoes I"],
  "FB-Iconic": ["Bruiser IV", "Flapjack IV", "Run Protector IV", "Pass Protector IV", "Fearless IV", "Tiptoes IV", "Bruiser III", "Flapjack III", "Run Protector III", "Pass Protector III", "Fearless III", "Tiptoes III", "Bruiser II", "Flapjack II", "Run Protector II", "Pass Protector II", "Fearless II", "Tiptoes II", "Bruiser I", "Flapjack I", "Run Protector I", "Pass Protector I", "Fearless I", "Tiptoes I"],
  "FB-Mythic": ["Bruiser V", "Flapjack V", "Run Protector V", "Pass Protector V", "Fearless V", "Tiptoes V", "Bruiser IV", "Flapjack IV", "Run Protector IV", "Pass Protector IV", "Fearless IV", "Tiptoes IV", "Bruiser III", "Flapjack III", "Run Protector III", "Pass Protector III", "Fearless III", "Tiptoes III", "Bruiser II", "Flapjack II", "Run Protector II", "Pass Protector II", "Fearless II", "Tiptoes II", "Bruiser I", "Flapjack I", "Run Protector I", "Pass Protector I", "Fearless I", "Tiptoes I"],
  "FB-Marvel": ["Bruiser V", "Flapjack V", "Run Protector V", "Pass Protector V", "Fearless V", "Tiptoes V", "Bruiser IV", "Flapjack IV", "Run Protector IV", "Pass Protector IV", "Fearless IV", "Tiptoes IV", "Bruiser III", "Flapjack III", "Run Protector III", "Pass Protector III", "Fearless III", "Tiptoes III", "Bruiser II", "Flapjack II", "Run Protector II", "Pass Protector II", "Fearless II", "Tiptoes II", "Bruiser I", "Flapjack I", "Run Protector I", "Pass Protector I", "Fearless I", "Tiptoes I"],
  
  // WR Traits
  "WR-Uncommon": ["Bruiser I", "Flapjack I", "Run Protector I", "Fearless I", "Tiptoes I"],
  "WR-Rare": ["Bruiser II", "Flapjack II", "Run Protector II", "Fearless II", "Tiptoes II", "Bruiser I", "Flapjack I", "Run Protector I", "Fearless I", "Tiptoes I"],
  "WR-Epic": ["Bruiser III", "Flapjack III", "Run Protector III", "Fearless III", "Tiptoes III", "Bruiser II", "Flapjack II", "Run Protector II", "Fearless II", "Tiptoes II", "Bruiser I", "Flapjack I", "Run Protector I", "Fearless I", "Tiptoes I"],
  "WR-Iconic": ["Bruiser IV", "Flapjack IV", "Run Protector IV", "Fearless IV", "Tiptoes IV", "Bruiser III", "Flapjack III", "Run Protector III", "Fearless III", "Tiptoes III", "Bruiser II", "Flapjack II", "Run Protector II", "Fearless II", "Tiptoes II", "Bruiser I", "Flapjack I", "Run Protector I", "Fearless I", "Tiptoes I"],
  "WR-Mythic": ["Bruiser V", "Flapjack V", "Run Protector V", "Fearless V", "Tiptoes V", "Bruiser IV", "Flapjack IV", "Run Protector IV", "Fearless IV", "Tiptoes IV", "Bruiser III", "Flapjack III", "Run Protector III", "Fearless III", "Tiptoes III", "Bruiser II", "Flapjack II", "Run Protector II", "Fearless II", "Tiptoes II", "Bruiser I", "Flapjack I", "Run Protector I", "Fearless I", "Tiptoes I"],
  "WR-Marvel": ["Bruiser V", "Flapjack V", "Run Protector V", "Fearless V", "Tiptoes V", "Bruiser IV", "Flapjack IV", "Run Protector IV", "Fearless IV", "Tiptoes IV", "Bruiser III", "Flapjack III", "Run Protector III", "Fearless III", "Tiptoes III", "Bruiser II", "Flapjack II", "Run Protector II", "Fearless II", "Tiptoes II", "Bruiser I", "Flapjack I", "Run Protector I", "Fearless I", "Tiptoes I"],
  
  // TE Traits
  "TE-Uncommon": ["Bruiser I", "Flapjack I", "Run Protector I", "Pass Protector I", "Fearless I", "Tiptoes I"],
  "TE-Rare": ["Bruiser II", "Flapjack II", "Run Protector II", "Pass Protector II", "Fearless II", "Tiptoes II", "Bruiser I", "Flapjack I", "Run Protector I", "Pass Protector I", "Fearless I", "Tiptoes I"],
  "TE-Epic": ["Bruiser III", "Flapjack III", "Run Protector III", "Pass Protector III", "Fearless III", "Tiptoes III", "Bruiser II", "Flapjack II", "Run Protector II", "Pass Protector II", "Fearless II", "Tiptoes II", "Bruiser I", "Flapjack I", "Run Protector I", "Pass Protector I", "Fearless I", "Tiptoes I"],
  "TE-Iconic": ["Bruiser IV", "Flapjack IV", "Run Protector IV", "Pass Protector IV", "Fearless IV", "Tiptoes IV", "Bruiser III", "Flapjack III", "Run Protector III", "Pass Protector III", "Fearless III", "Tiptoes III", "Bruiser II", "Flapjack II", "Run Protector II", "Pass Protector II", "Fearless II", "Tiptoes II", "Bruiser I", "Flapjack I", "Run Protector I", "Pass Protector I", "Fearless I", "Tiptoes I"],
  "TE-Mythic": ["Bruiser V", "Flapjack V", "Run Protector V", "Pass Protector V", "Fearless V", "Tiptoes V", "Bruiser IV", "Flapjack IV", "Run Protector IV", "Pass Protector IV", "Fearless IV", "Tiptoes IV", "Bruiser III", "Flapjack III", "Run Protector III", "Pass Protector III", "Fearless III", "Tiptoes III", "Bruiser II", "Flapjack II", "Run Protector II", "Pass Protector II", "Fearless II", "Tiptoes II", "Bruiser I", "Flapjack I", "Run Protector I", "Pass Protector I", "Fearless I", "Tiptoes I"],
  "TE-Marvel": ["Bruiser V", "Flapjack V", "Run Protector V", "Pass Protector V", "Fearless V", "Tiptoes V", "Bruiser IV", "Flapjack IV", "Run Protector IV", "Pass Protector IV", "Fearless IV", "Tiptoes IV", "Bruiser III", "Flapjack III", "Run Protector III", "Pass Protector III", "Fearless III", "Tiptoes III", "Bruiser II", "Flapjack II", "Run Protector II", "Pass Protector II", "Fearless II", "Tiptoes II", "Bruiser I", "Flapjack I", "Run Protector I", "Pass Protector I", "Fearless I", "Tiptoes I"],
  
  // OT Traits
  "OT-Uncommon": ["Flapjack I", "Edge Protector I", "Run Protector I", "Pass Protector I"],
  "OT-Rare": ["Flapjack II", "Edge Protector II", "Run Protector II", "Pass Protector II", "Flapjack I", "Edge Protector I", "Run Protector I", "Pass Protector I"],
  "OT-Epic": ["Flapjack III", "Edge Protector III", "Run Protector III", "Pass Protector III", "Flapjack II", "Edge Protector II", "Run Protector II", "Pass Protector II", "Flapjack I", "Edge Protector I", "Run Protector I", "Pass Protector I"],
  "OT-Iconic": ["Flapjack IV", "Edge Protector IV", "Run Protector IV", "Pass Protector IV", "Flapjack III", "Edge Protector III", "Run Protector III", "Pass Protector III", "Flapjack II", "Edge Protector II", "Run Protector II", "Pass Protector II", "Flapjack I", "Edge Protector I", "Run Protector I", "Pass Protector I"],
  "OT-Mythic": ["Flapjack V", "Edge Protector V", "Run Protector V", "Pass Protector V", "Flapjack IV", "Edge Protector IV", "Run Protector IV", "Pass Protector IV", "Flapjack III", "Edge Protector III", "Run Protector III", "Pass Protector III", "Flapjack II", "Edge Protector II", "Run Protector II", "Pass Protector II", "Flapjack I", "Edge Protector I", "Run Protector I", "Pass Protector I"],
  "OT-Marvel": ["Flapjack V", "Edge Protector V", "Run Protector V", "Pass Protector V", "Flapjack IV", "Edge Protector IV", "Run Protector IV", "Pass Protector IV", "Flapjack III", "Edge Protector III", "Run Protector III", "Pass Protector III", "Flapjack II", "Edge Protector II", "Run Protector II", "Pass Protector II", "Flapjack I", "Edge Protector I", "Run Protector I", "Pass Protector I"],
  
  // OG Traits
  "OG-Uncommon": ["Flapjack I", "Run Protector I", "Pass Protector I"],
  "OG-Rare": ["Flapjack II", "Run Protector II", "Pass Protector II", "Flapjack I", "Run Protector I", "Pass Protector I"],
  "OG-Epic": ["Flapjack III", "Run Protector III", "Pass Protector III", "Flapjack II", "Run Protector II", "Pass Protector II", "Flapjack I", "Run Protector I", "Pass Protector I"],
  "OG-Iconic": ["Flapjack IV", "Run Protector IV", "Pass Protector IV", "Flapjack III", "Run Protector III", "Pass Protector III", "Flapjack II", "Run Protector II", "Pass Protector II", "Flapjack I", "Run Protector I", "Pass Protector I"],
  "OG-Mythic": ["Flapjack V", "Run Protector V", "Pass Protector V", "Flapjack IV", "Run Protector IV", "Pass Protector IV", "Flapjack III", "Run Protector III", "Pass Protector III", "Flapjack II", "Run Protector II", "Pass Protector II", "Flapjack I", "Run Protector I", "Pass Protector I"],
  "OG-Marvel": ["Flapjack V", "Run Protector V", "Pass Protector V", "Flapjack IV", "Run Protector IV", "Pass Protector IV", "Flapjack III", "Run Protector III", "Pass Protector III", "Flapjack II", "Run Protector II", "Pass Protector II", "Flapjack I", "Run Protector I", "Pass Protector I"],
  
  // C Traits
  "C-Uncommon": ["Flapjack I", "Run Protector I", "Pass Protector I"],
  "C-Rare": ["Flapjack II", "Run Protector II", "Pass Protector II", "Flapjack I", "Run Protector I", "Pass Protector I"],
  "C-Epic": ["Flapjack III", "Run Protector III", "Pass Protector III", "Flapjack II", "Run Protector II", "Pass Protector II", "Flapjack I", "Run Protector I", "Pass Protector I"],
  "C-Iconic": ["Flapjack IV", "Run Protector IV", "Pass Protector IV", "Flapjack III", "Run Protector III", "Pass Protector III", "Flapjack II", "Run Protector II", "Pass Protector II", "Flapjack I", "Run Protector I", "Pass Protector I"],
  "C-Mythic": ["Flapjack V", "Run Protector V", "Pass Protector V", "Flapjack IV", "Run Protector IV", "Pass Protector IV", "Flapjack III", "Run Protector III", "Pass Protector III", "Flapjack II", "Run Protector II", "Pass Protector II", "Flapjack I", "Run Protector I", "Pass Protector I"],
  "C-Marvel": ["Flapjack V", "Run Protector V", "Pass Protector V", "Flapjack IV", "Run Protector IV", "Pass Protector IV", "Flapjack III", "Run Protector III", "Pass Protector III", "Flapjack II", "Run Protector II", "Pass Protector II", "Flapjack I", "Run Protector I", "Pass Protector I"],
  
  // DE Traits
  "DE-Uncommon": ["Punisher I", "Edge Threat I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Stonewall I", "Wrapped Up I"],
  "DE-Rare": ["Punisher II", "Edge Threat II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Stonewall II", "Wrapped Up II", "Punisher I", "Edge Threat I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Stonewall I", "Wrapped Up I"],
  "DE-Epic": ["Punisher III", "Edge Threat III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Stonewall III", "Wrapped Up III", "Punisher II", "Edge Threat II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Stonewall II", "Wrapped Up II", "Punisher I", "Edge Threat I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Stonewall I", "Wrapped Up I"],
  "DE-Iconic": ["Punisher IV", "Edge Threat IV", "Run Crusher IV", "Catch Crusher IV", "Shedder IV", "Stonewall IV", "Wrapped Up IV", "Punisher III", "Edge Threat III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Stonewall III", "Wrapped Up III", "Punisher II", "Edge Threat II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Stonewall II", "Wrapped Up II", "Punisher I", "Edge Threat I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Stonewall I", "Wrapped Up I"],
  "DE-Mythic": ["Punisher V", "Edge Threat V", "Run Crusher V", "Catch Crusher V", "Shedder V", "Stonewall V", "Wrapped Up V", "Punisher IV", "Edge Threat IV", "Run Crusher IV", "Catch Crusher IV", "Shedder IV", "Stonewall IV", "Wrapped Up IV", "Punisher III", "Edge Threat III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Stonewall III", "Wrapped Up III", "Punisher II", "Edge Threat II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Stonewall II", "Wrapped Up II", "Punisher I", "Edge Threat I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Stonewall I", "Wrapped Up I"],
  "DE-Marvel": ["Punisher V", "Edge Threat V", "Run Crusher V", "Catch Crusher V", "Shedder V", "Stonewall V", "Wrapped Up V", "Punisher IV", "Edge Threat IV", "Run Crusher IV", "Catch Crusher IV", "Shedder IV", "Stonewall IV", "Wrapped Up IV", "Punisher III", "Edge Threat III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Stonewall III", "Wrapped Up III", "Punisher II", "Edge Threat II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Stonewall II", "Wrapped Up II", "Punisher I", "Edge Threat I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Stonewall I", "Wrapped Up I"],
  
  // DT Traits
  "DT-Uncommon": ["Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Stonewall I", "Wrapped Up I"],
  "DT-Rare": ["Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Stonewall II", "Wrapped Up II", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Stonewall I", "Wrapped Up I"],
  "DT-Epic": ["Punisher III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Stonewall III", "Wrapped Up III", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Stonewall II", "Wrapped Up II", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Stonewall I", "Wrapped Up I"],
  "DT-Iconic": ["Punisher IV", "Run Crusher IV", "Catch Crusher IV", "Shedder IV", "Stonewall IV", "Wrapped Up IV", "Punisher III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Stonewall III", "Wrapped Up III", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Stonewall II", "Wrapped Up II", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Stonewall I", "Wrapped Up I"],
  "DT-Mythic": ["Punisher V", "Run Crusher V", "Catch Crusher V", "Shedder V", "Stonewall V", "Wrapped Up V", "Punisher IV", "Run Crusher IV", "Catch Crusher IV", "Shedder IV", "Stonewall IV", "Wrapped Up IV", "Punisher III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Stonewall III", "Wrapped Up III", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Stonewall II", "Wrapped Up II", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Stonewall I", "Wrapped Up I"],
  "DT-Marvel": ["Punisher V", "Run Crusher V", "Catch Crusher V", "Shedder V", "Stonewall V", "Wrapped Up V", "Punisher IV", "Run Crusher IV", "Catch Crusher IV", "Shedder IV", "Stonewall IV", "Wrapped Up IV", "Punisher III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Stonewall III", "Wrapped Up III", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Stonewall II", "Wrapped Up II", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Stonewall I", "Wrapped Up I"],
  
  // LB Traits
  "LB-Uncommon": ["Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I"],
  "LB-Rare": ["Ballhawk II", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Swat Team II", "Stonewall II", "Wrapped Up II", "Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I"],
  "LB-Epic": ["Ballhawk III", "Punisher III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Swat Team III", "Stonewall III", "Wrapped Up III", "Ballhawk II", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Swat Team II", "Stonewall II", "Wrapped Up II", "Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I"],
  "LB-Iconic": ["Ballhawk IV", "Punisher IV", "Run Crusher IV", "Catch Crusher IV", "Shedder IV", "Swat Team IV", "Stonewall IV", "Wrapped Up IV", "Ballhawk III", "Punisher III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Swat Team III", "Stonewall III", "Wrapped Up III", "Ballhawk II", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Swat Team II", "Stonewall II", "Wrapped Up II", "Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I"],
  "LB-Mythic": ["Ballhawk V", "Punisher V", "Run Crusher V", "Catch Crusher V", "Shedder V", "Swat Team V", "Stonewall V", "Wrapped Up V", "Ballhawk IV", "Punisher IV", "Run Crusher IV", "Catch Crusher IV", "Shedder IV", "Swat Team IV", "Stonewall IV", "Wrapped Up IV", "Ballhawk III", "Punisher III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Swat Team III", "Stonewall III", "Wrapped Up III", "Ballhawk II", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Swat Team II", "Stonewall II", "Wrapped Up II", "Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I"],
  "LB-Marvel": ["Ballhawk V", "Punisher V", "Run Crusher V", "Catch Crusher V", "Shedder V", "Swat Team V", "Stonewall V", "Wrapped Up V", "Ballhawk IV", "Punisher IV", "Run Crusher IV", "Catch Crusher IV", "Shedder IV", "Swat Team IV", "Stonewall IV", "Wrapped Up IV", "Ballhawk III", "Punisher III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Swat Team III", "Stonewall III", "Wrapped Up III", "Ballhawk II", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Swat Team II", "Stonewall II", "Wrapped Up II", "Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I"],
  
  // MLB Traits
  "MLB-Uncommon": ["Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I", "Red Zone Guardian I"],
  "MLB-Rare": ["Ballhawk II", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Swat Team II", "Stonewall II", "Wrapped Up II", "Red Zone Guardian II", "Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I", "Red Zone Guardian I"],
  "MLB-Epic": ["Ballhawk III", "Punisher III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Swat Team III", "Stonewall III", "Wrapped Up III", "Red Zone Guardian III", "Ballhawk II", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Swat Team II", "Stonewall II", "Wrapped Up II", "Red Zone Guardian II", "Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I", "Red Zone Guardian I"],
  "MLB-Iconic": ["Ballhawk IV", "Punisher IV", "Run Crusher IV", "Catch Crusher IV", "Shedder IV", "Swat Team IV", "Stonewall IV", "Wrapped Up IV", "Red Zone Guardian IV", "Ballhawk III", "Punisher III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Swat Team III", "Stonewall III", "Wrapped Up III", "Red Zone Guardian III", "Ballhawk II", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Swat Team II", "Stonewall II", "Wrapped Up II", "Red Zone Guardian II", "Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I", "Red Zone Guardian I"],
  "MLB-Mythic": ["Ballhawk V", "Punisher V", "Run Crusher V", "Catch Crusher V", "Shedder V", "Swat Team V", "Stonewall V", "Wrapped Up V", "Red Zone Guardian V", "Ballhawk IV", "Punisher IV", "Run Crusher IV", "Catch Crusher IV", "Shedder IV", "Swat Team IV", "Stonewall IV", "Wrapped Up IV", "Red Zone Guardian IV", "Ballhawk III", "Punisher III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Swat Team III", "Stonewall III", "Wrapped Up III", "Red Zone Guardian III", "Ballhawk II", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Swat Team II", "Stonewall II", "Wrapped Up II", "Red Zone Guardian II", "Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I", "Red Zone Guardian I"],
  "MLB-Marvel": ["Ballhawk V", "Punisher V", "Run Crusher V", "Catch Crusher V", "Shedder V", "Swat Team V", "Stonewall V", "Wrapped Up V", "Red Zone Guardian V", "Ballhawk IV", "Punisher IV", "Run Crusher IV", "Catch Crusher IV", "Shedder IV", "Swat Team IV", "Stonewall IV", "Wrapped Up IV", "Red Zone Guardian IV", "Ballhawk III", "Punisher III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Swat Team III", "Stonewall III", "Wrapped Up III", "Red Zone Guardian III", "Ballhawk II", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Swat Team II", "Stonewall II", "Wrapped Up II", "Red Zone Guardian II", "Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I", "Red Zone Guardian I"],
  
  // CB Traits
  "CB-Uncommon": ["Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I"],
  "CB-Rare": ["Ballhawk II", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Swat Team II", "Stonewall II", "Wrapped Up II", "Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I"],
  "CB-Epic": ["Ballhawk III", "Punisher III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Swat Team III", "Stonewall III", "Wrapped Up III", "Ballhawk II", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Swat Team II", "Stonewall II", "Wrapped Up II", "Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I"],
  "CB-Iconic": ["Ballhawk IV", "Punisher IV", "Run Crusher IV", "Catch Crusher IV", "Shedder IV", "Swat Team IV", "Stonewall IV", "Wrapped Up IV", "Ballhawk III", "Punisher III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Swat Team III", "Stonewall III", "Wrapped Up III", "Ballhawk II", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Swat Team II", "Stonewall II", "Wrapped Up II", "Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I"],
  "CB-Mythic": ["Ballhawk V", "Punisher V", "Run Crusher V", "Catch Crusher V", "Shedder V", "Swat Team V", "Stonewall V", "Wrapped Up V", "Ballhawk IV", "Punisher IV", "Run Crusher IV", "Catch Crusher IV", "Shedder IV", "Swat Team IV", "Stonewall IV", "Wrapped Up IV", "Ballhawk III", "Punisher III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Swat Team III", "Stonewall III", "Wrapped Up III", "Ballhawk II", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Swat Team II", "Stonewall II", "Wrapped Up II", "Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I"],
  "CB-Marvel": ["Ballhawk V", "Punisher V", "Run Crusher V", "Catch Crusher V", "Shedder V", "Swat Team V", "Stonewall V", "Wrapped Up V", "Ballhawk IV", "Punisher IV", "Run Crusher IV", "Catch Crusher IV", "Shedder IV", "Swat Team IV", "Stonewall IV", "Wrapped Up IV", "Ballhawk III", "Punisher III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Swat Team III", "Stonewall III", "Wrapped Up III", "Ballhawk II", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Swat Team II", "Stonewall II", "Wrapped Up II", "Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I"],
  
  // S Traits
  "S-Uncommon": ["Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I"],
  "S-Rare": ["Ballhawk II", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Swat Team II", "Stonewall II", "Wrapped Up II", "Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I"],
  "S-Epic": ["Ballhawk III", "Punisher III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Swat Team III", "Stonewall III", "Wrapped Up III", "Ballhawk II", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Swat Team II", "Stonewall II", "Wrapped Up II", "Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I"],
  "S-Iconic": ["Ballhawk IV", "Punisher IV", "Run Crusher IV", "Catch Crusher IV", "Shedder IV", "Swat Team IV", "Stonewall IV", "Wrapped Up IV", "Ballhawk III", "Punisher III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Swat Team III", "Stonewall III", "Wrapped Up III", "Ballhawk II", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Swat Team II", "Stonewall II", "Wrapped Up II", "Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I"],
  "S-Mythic": ["Ballhawk V", "Punisher V", "Run Crusher V", "Catch Crusher V", "Shedder V", "Swat Team V", "Stonewall V", "Wrapped Up V", "Ballhawk IV", "Punisher IV", "Run Crusher IV", "Catch Crusher IV", "Shedder IV", "Swat Team IV", "Stonewall IV", "Wrapped Up IV", "Ballhawk III", "Punisher III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Swat Team III", "Stonewall III", "Wrapped Up III", "Ballhawk II", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Swat Team II", "Stonewall II", "Wrapped Up II", "Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I"],
  "S-Marvel": ["Ballhawk V", "Punisher V", "Run Crusher V", "Catch Crusher V", "Shedder V", "Swat Team V", "Stonewall V", "Wrapped Up V", "Ballhawk IV", "Punisher IV", "Run Crusher IV", "Catch Crusher IV", "Shedder IV", "Swat Team IV", "Stonewall IV", "Wrapped Up IV", "Ballhawk III", "Punisher III", "Run Crusher III", "Catch Crusher III", "Shedder III", "Swat Team III", "Stonewall III", "Wrapped Up III", "Ballhawk II", "Punisher II", "Run Crusher II", "Catch Crusher II", "Shedder II", "Swat Team II", "Stonewall II", "Wrapped Up II", "Ballhawk I", "Punisher I", "Run Crusher I", "Catch Crusher I", "Shedder I", "Swat Team I", "Stonewall I", "Wrapped Up I"],
  
  // K Traits
  "K-Uncommon": ["Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
  "K-Rare": ["Quick Cuts II", "Pocket Intel II", "Sure Hands II", "Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
  "K-Epic": ["Quick Cuts III", "Pocket Intel III", "Sure Hands III", "Quick Cuts II", "Pocket Intel II", "Sure Hands II", "Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
  "K-Iconic": ["Quick Cuts IV", "Pocket Intel IV", "Sure Hands IV", "Quick Cuts III", "Pocket Intel III", "Sure Hands III", "Quick Cuts II", "Pocket Intel II", "Sure Hands II", "Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
  "K-Mythic": ["Quick Cuts V", "Pocket Intel V", "Sure Hands V", "Quick Cuts IV", "Pocket Intel IV", "Sure Hands IV", "Quick Cuts III", "Pocket Intel III", "Sure Hands III", "Quick Cuts II", "Pocket Intel II", "Sure Hands II", "Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
  "K-Marvel": ["Quick Cuts V", "Pocket Intel V", "Sure Hands V", "Quick Cuts IV", "Pocket Intel IV", "Sure Hands IV", "Quick Cuts III", "Pocket Intel III", "Sure Hands III", "Quick Cuts II", "Pocket Intel II", "Sure Hands II", "Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
  
  // P Traits
  "P-Uncommon": ["Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
  "P-Rare": ["Quick Cuts II", "Pocket Intel II", "Sure Hands II", "Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
  "P-Epic": ["Quick Cuts III", "Pocket Intel III", "Sure Hands III", "Quick Cuts II", "Pocket Intel II", "Sure Hands II", "Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
  "P-Iconic": ["Quick Cuts IV", "Pocket Intel IV", "Sure Hands IV", "Quick Cuts III", "Pocket Intel III", "Sure Hands III", "Quick Cuts II", "Pocket Intel II", "Sure Hands II", "Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
  "P-Mythic": ["Quick Cuts V", "Pocket Intel V", "Sure Hands V", "Quick Cuts IV", "Pocket Intel IV", "Sure Hands IV", "Quick Cuts III", "Pocket Intel III", "Sure Hands III", "Quick Cuts II", "Pocket Intel II", "Sure Hands II", "Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
  "P-Marvel": ["Quick Cuts V", "Pocket Intel V", "Sure Hands V", "Quick Cuts IV", "Pocket Intel IV", "Sure Hands IV", "Quick Cuts III", "Pocket Intel III", "Sure Hands III", "Quick Cuts II", "Pocket Intel II", "Sure Hands II", "Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
  
  // KR Traits
  "KR-Uncommon": ["Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
  "KR-Rare": ["Quick Cuts II", "Pocket Intel II", "Sure Hands II", "Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
  "KR-Epic": ["Quick Cuts III", "Pocket Intel III", "Sure Hands III", "Quick Cuts II", "Pocket Intel II", "Sure Hands II", "Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
  "KR-Iconic": ["Quick Cuts IV", "Pocket Intel IV", "Sure Hands IV", "Quick Cuts III", "Pocket Intel III", "Sure Hands III", "Quick Cuts II", "Pocket Intel II", "Sure Hands II", "Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
  "KR-Mythic": ["Quick Cuts V", "Pocket Intel V", "Sure Hands V", "Quick Cuts IV", "Pocket Intel IV", "Sure Hands IV", "Quick Cuts III", "Pocket Intel III", "Sure Hands III", "Quick Cuts II", "Pocket Intel II", "Sure Hands II", "Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
  "KR-Marvel": ["Quick Cuts V", "Pocket Intel V", "Sure Hands V", "Quick Cuts IV", "Pocket Intel IV", "Sure Hands IV", "Quick Cuts III", "Pocket Intel III", "Sure Hands III", "Quick Cuts II", "Pocket Intel II", "Sure Hands II", "Quick Cuts I", "Pocket Intel I", "Sure Hands I"],

  // PR Traits
  "PR-Uncommon": ["Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
  "PR-Rare": ["Quick Cuts II", "Pocket Intel II", "Sure Hands II", "Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
  "PR-Epic": ["Quick Cuts III", "Pocket Intel III", "Sure Hands III", "Quick Cuts II", "Pocket Intel II", "Sure Hands II", "Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
  "PR-Iconic": ["Quick Cuts IV", "Pocket Intel IV", "Sure Hands IV", "Quick Cuts III", "Pocket Intel III", "Sure Hands III", "Quick Cuts II", "Pocket Intel II", "Sure Hands II", "Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
  "PR-Mythic": ["Quick Cuts V", "Pocket Intel V", "Sure Hands V", "Quick Cuts IV", "Pocket Intel IV", "Sure Hands IV", "Quick Cuts III", "Pocket Intel III", "Sure Hands III", "Quick Cuts II", "Pocket Intel II", "Sure Hands II", "Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
  "PR-Marvel": ["Quick Cuts V", "Pocket Intel V", "Sure Hands V", "Quick Cuts IV", "Pocket Intel IV", "Sure Hands IV", "Quick Cuts III", "Pocket Intel III", "Sure Hands III", "Quick Cuts II", "Pocket Intel II", "Sure Hands II", "Quick Cuts I", "Pocket Intel I", "Sure Hands I"],
};

export default function PlayerProfile({
  players,
  selectedPlayers = [],
  togglePlayer,
  setSelectedPlayers
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const player = players?.find((p) => p.id === parseInt(id, 10));
  const { theme } = useTheme();
  const [showLimitModal, setShowLimitModal] = React.useState(false);

  // State to track which player version is active (for dual cards)
  const [activePlayerId, setActivePlayerId] = useState(parseInt(id, 10));

  useEffect(() => {
  setActivePlayerId(parseInt(id, 10));
}, [id]);
  
  // Get the active player (which might be different from URL id for dual cards)
  const currentPlayer = players?.find((p) => p.id === activePlayerId);
  
  // Check if this is a Dual card and get the partner
  const dualPartner = currentPlayer?.isDualCard 
    ? players?.find((p) => p.id === currentPlayer.dualPartnerId)
    : null;

  if (!player) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold">Player not found</h2>
        <Link
          to="/players"
          className="inline-block mt-[-8px] mb-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200"
        >
          ← Back to Player Database
        </Link>
      </div>
    );
  }

  const validPlayers = Array.isArray(selectedPlayers)
    ? selectedPlayers.filter((p) => p && p.id !== undefined && p.id !== null)
    : [];

  const handleTogglePlayer = (player) => {
    const isSelected = validPlayers.some((p) => p.id === player.id);
    if (!isSelected && validPlayers.length >= 5) {
      setShowLimitModal(true);
      return;
    }
    togglePlayer?.(player);
  };

  const traitKey = `${currentPlayer.position.split("|")[0].trim()}-${currentPlayer.rarity}`;
  const defaultTraits = POSITION_RARITY_TRAITS[traitKey] || [];
  const customTraits = currentPlayer.traits || [];
  const applicableTraitNames = [...defaultTraits, ...customTraits];
  const applicableTraits = applicableTraitNames.map(name => ({
    name,
    ...TRAIT_DATA[name]
  }));

  const getHighlightClass = (statKey, value, label = null) => {
    if (!Array.isArray(selectedPlayers)) return "";

    const values = selectedPlayers
      .filter((p) => p && p.stats)
      .map((p) => {
        if (label === "Rarity") {
          const rarityRank = {
            "Starter": 1,
            "Uncommon": 2,
            "Rare": 3,
            "Epic": 4,
            "Iconic": 5,
            "Mythic": 6,
            "Marvel": 7
          };
          return rarityRank[p.rarity] || 0;
        }
        if (label === "OVR") return p.ovr;
        if (label === "Height") return p.height;
        if (label === "Weight (lbs.)") return p.weight;
        
        const headerStat = STAT_GROUPS.find(group => group.label === statKey);
        if (headerStat) {
          return p.stats[statKey]?.overall;
        }
        
        return (
          p.stats.Quickness?.[statKey] ||
          p.stats.Physical?.[statKey] ||
          p.stats.Mental?.[statKey] ||
          p.stats.Passing?.[statKey] ||
          p.stats.Receiving?.[statKey] ||
          p.stats.Rushing?.[statKey] ||
          p.stats.Blocking?.[statKey] ||
          p.stats.Coverage?.[statKey] ||
          p.stats["Pass Rush"]?.[statKey] ||
          p.stats["Run Stop"]?.[statKey] ||
          p.stats.Kicking?.[statKey] ||
          p.stats.Returning?.[statKey] ||
          undefined
        );
      })
      .filter((v) => v !== undefined);

    if (values.length === 0) return "";

    const sorted = [...new Set(values)].sort((a, b) => b - a);
    const isBest = value === sorted[0];
    const isWorst = value === sorted[sorted.length - 1];

    if (isBest) return "bg-green-200 dark:bg-green-900";
    if (isWorst) return "bg-red-200 dark:bg-red-900";
    return "bg-yellow-200 dark:bg-yellow-900";
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (!Array.isArray(selectedPlayers)) return;
    const reordered = Array.from(selectedPlayers);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setSelectedPlayers?.(reordered);
  };

  const formatHeight = (inches) => {
    if (inches == null) return "N/A";
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return `${feet}'${remainingInches}"`;
  };

  const borderColor = theme === 'dark' ? '#64748b' : '#d1d5db';

  return (
    <>
      {showLimitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 max-w-md w-full mx-4 ${
            theme === "dark" ? "bg-zinc-800 text-gray-100" : "bg-white text-gray-900"
          }`}>
            <h2 className="text-xl font-bold mb-4">localhost:5173 says</h2>
            <p className="mb-6">You can only compare up to 5 players at once.</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowLimitModal(false)}
                className="px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 font-semibold"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex max-w-full flex-col gap-4 overflow-x-hidden p-3 sm:p-4 lg:flex-row">
        <div className="w-full lg:w-3/4 mb-6 lg:mb-0">
          <Link
            to="/players"
            className="mb-4 mt-[-8px] inline-block max-w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-colors duration-200 hover:bg-blue-700 sm:px-4 sm:text-base"
          >
            ← Back to Player Database
          </Link>

            {/* Dual Card Toggle - Only show if this is a dual card */}
{currentPlayer.isDualCard && dualPartner && (
  <div className={`mb-6 rounded-lg border p-4 shadow-lg ${
    theme === "dark" ? "border-yellow-500/50 bg-zinc-900" : "border-yellow-500/60 bg-white"
  }`}>
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-500">Dual Player Card</p>
        <h1 className="mt-1 text-2xl font-black">Choose Player Version</h1>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:min-w-[420px]">
        <button
          onClick={() => setActivePlayerId(currentPlayer.id)}
          className={`rounded-lg border px-5 py-4 text-left transition-all duration-200 ${
            activePlayerId === currentPlayer.id
              ? "border-yellow-400 bg-yellow-400 text-black shadow-[0_0_0_2px_rgba(250,204,21,0.25),0_12px_30px_rgba(250,204,21,0.22)]"
              : theme === "dark"
                ? "border-slate-700 bg-zinc-800 text-gray-100 hover:border-yellow-500"
                : "border-gray-300 bg-gray-50 text-gray-900 hover:border-yellow-500"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-lg font-black">{currentPlayer.position.split("|")[0]} Version</div>
              <div className="text-sm font-semibold opacity-80">{currentPlayer.ovr} OVR</div>
            </div>
            {activePlayerId === currentPlayer.id && (
              <span className="rounded-full bg-black px-2 py-1 text-xs font-bold uppercase text-yellow-300">Active</span>
            )}
          </div>
        </button>

        <button
          onClick={() => setActivePlayerId(dualPartner.id)}
          className={`rounded-lg border px-5 py-4 text-left transition-all duration-200 ${
            activePlayerId === dualPartner.id
              ? "border-yellow-400 bg-yellow-400 text-black shadow-[0_0_0_2px_rgba(250,204,21,0.25),0_12px_30px_rgba(250,204,21,0.22)]"
              : theme === "dark"
                ? "border-slate-700 bg-zinc-800 text-gray-100 hover:border-yellow-500"
                : "border-gray-300 bg-gray-50 text-gray-900 hover:border-yellow-500"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-lg font-black">{dualPartner.position.split("|")[0]} Version</div>
              <div className="text-sm font-semibold opacity-80">{dualPartner.ovr} OVR</div>
            </div>
            {activePlayerId === dualPartner.id && (
              <span className="rounded-full bg-black px-2 py-1 text-xs font-bold uppercase text-yellow-300">Active</span>
            )}
          </div>
        </button>
      </div>
    </div>
  </div>
)}
          <div className="flex max-w-full flex-col gap-4 md:flex-row md:items-start">
            <img
              src={currentPlayer.image}
              alt={currentPlayer.name}
              className={`mx-auto h-auto max-h-[28rem] w-full max-w-[18rem] object-contain rounded md:mx-0 md:h-80 md:w-64 ${theme === 'dark' ? 'bg-black-900' : 'bg-white'}`}
            />
            <div className="min-w-0 max-w-full text-base leading-relaxed">
              <h2 className="break-words text-2xl font-bold">{currentPlayer.name}</h2>
{currentPlayer.released && (
  <p className={`text-sm mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
    Released: {currentPlayer.released}
  </p>
)}
<p className="break-words"><strong>OVR:</strong> {currentPlayer.ovr}</p>
              <p className="break-words"><strong>Height:</strong> {formatHeight(currentPlayer.height)}</p>
              <p className="break-words"><strong>Weight (lbs.):</strong> {currentPlayer.weight ?? "N/A"}</p>           
              <p className="break-words"><strong>Position:</strong> {currentPlayer.position}</p>
              <p className="break-words"><strong>Team:</strong> {currentPlayer.team}</p>
              <p className="break-words"><strong>Program:</strong> {Array.isArray(currentPlayer.program) ? currentPlayer.program.join(", ") : currentPlayer.program}</p>
              <p className="break-words"><strong>Rarity:</strong> {currentPlayer.rarity}</p>
              <p className="break-words"><strong>Archetype:</strong> {currentPlayer.archetype}</p>
              {currentPlayer.boost && (
                <p className="break-words"><strong>Boost:</strong> {currentPlayer.boost}</p>
              )}
              {currentPlayer.boostExpires && (
                <p className="break-words"><strong>Boost Expires:</strong> {currentPlayer.boostExpires}</p>
              )}

              <button
                onClick={() => handleTogglePlayer(currentPlayer)}
                className={`mt-4 w-full rounded px-4 py-2 md:w-auto ${
                  validPlayers.some((p) => p.id === currentPlayer.id)
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {validPlayers.some((p) => p.id === currentPlayer.id)
                  ? "Remove from Comparison"
                  : "Add to Comparison"}
              </button>
            </div>
          </div>

          <div className="mt-6">
  <h3 className="text-xl font-bold mb-2">
    <Link to="/guides/team-building/stats" className="text-blue-500 hover:text-blue-600 underline">
  Stats
</Link>
  </h3>
            {STAT_GROUPS.map((group) => (
              <div key={group.label} className="mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {group.label}: {currentPlayer.stats?.[group.label]?.overall ?? "N/A"}
                  </span>
                </div>
<ul className="list-disc list-inside ml-4">
  {group.stats.map((stat) => (
    <li key={stat}>
      <span className="font-bold">{stat}:</span>{" "}
      {currentPlayer.stats?.[group.label]?.[stat] ??
        currentPlayer.stats?.Quickness?.[stat] ??
        currentPlayer.stats?.Physical?.[stat] ??
        currentPlayer.stats?.Mental?.[stat] ??
        currentPlayer.stats?.Passing?.[stat] ??
        currentPlayer.stats?.Receiving?.[stat] ??
        currentPlayer.stats?.Rushing?.[stat] ??
        currentPlayer.stats?.Blocking?.[stat] ??
        currentPlayer.stats?.Coverage?.[stat] ??
        currentPlayer.stats?.["Pass Rush"]?.[stat] ??
        currentPlayer.stats?.["Run Stop"]?.[stat] ??
        currentPlayer.stats?.Kicking?.[stat] ??
        currentPlayer.stats?.Returning?.[stat] ??
        "N/A"}
    </li>
  ))}
</ul>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold mb-3">
  <Link to="/guides/team-building/traits" className="text-blue-500 hover:text-blue-600 underline">
    Applicable Traits
  </Link>
</h3>
            {applicableTraits.length > 0 ? (
              <div className="space-y-2">
                {applicableTraits.map((trait) => {
                  const tierColor = getTraitTierColor(trait.name);
                  return (
                    <div 
                      key={trait.name} 
                      className={`${tierColor} p-3 rounded flex items-center gap-3`}
                    >
                      <img 
                        src={trait.icon} 
                        alt={trait.name}
                        className={`w-12 h-12 object-contain rounded ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}
                        onError={(e) => {
                          e.target.src = 'https://i.imgur.com/9QDMidt.png';
                        }}
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-black dark:text-white">{trait.name}</div>
                        <div className="text-xs text-gray-800 dark:text-gray-300">
                          {trait.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                No Traits can be applied to this player.
              </p>
            )}
          </div>

          <PlayerComments playerId={currentPlayer.id} />
        </div>

        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          <div 
            className={`p-4 rounded border ${theme === 'dark' ? 'bg-zinc-800 border-slate-700' : 'bg-white border-blue-500'}`}
          >
            <h2 className="text-xl font-bold mb-2 dark:text-white">Comparison Panel</h2>
            {validPlayers.length === 0 ? (
              <p className="dark:text-gray-400">No players selected yet.</p>
            ) : (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="compare-panel">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {validPlayers.map((p, index) => {
                        const rarityClass = rarityColors[p.rarity] || "bg-white border-gray-300";
                        return (
                          <Draggable
                            key={p.id.toString()}
                            draggableId={p.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
  ref={provided.innerRef}
  {...provided.draggableProps}
  {...provided.dragHandleProps}
  className={`${rarityClass} p-2 mb-2 rounded flex items-center justify-between`}
>
  <div
    className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity flex-1"
    onClick={() => navigate(`/player/${p.id}`)}
  >
    <img
      src={p.image}
      alt={p.name}
      className={`w-12 h-12 object-contain rounded ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}
    />
    <div>
      <div className="font-semibold text-black dark:text-white">{p.name}</div>
      <div className="text-xs text-gray-800 dark:text-gray-300">
        {p.ovr} OVR • {p.rarity} • {p.program} • {p.position.split("|")[0]} ({p.archetype})
      </div>
    </div>
  </div>
  <button
    onClick={(e) => {
      e.stopPropagation();
      handleTogglePlayer(p);
    }}
    className="text-red-500 font-bold hover:text-red-600"
  >
    ✕
  </button>
</div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>

          {validPlayers.length > 0 && (
            <div className={`p-4 rounded border overflow-x-auto ${theme === 'dark' ? 'bg-zinc-800 border-slate-700' : 'bg-transparent border-green-500'}`}>
              <h3 className="text-lg font-bold mb-2 dark:text-white">Stat Comparison</h3>
              <table className="table-fixed w-full text-sm border-collapse border" style={{ borderColor }}>
                <thead>
                  <tr>
                    <th className={`border p-1 w-35 ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-100'}`} style={{ borderColor }}>Stat</th>
                    {validPlayers.map((p) => {
                      const rarityClass = rarityColors[p.rarity] || "bg-white border-gray-300";
                      return (
                        <th 
                          key={p.id} 
                          className={`border p-2 ${rarityClass} text-center`}
                          style={{ width: `${100 / validPlayers.length}%`, borderColor }}
                        >
                          <div 
                            className="flex flex-col items-center justify-center text-center gap-1 cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => navigate(`/player/${p.id}`)}
                          >
                            <div className="flex justify-center items-center gap-2 w-full">
                              <span className="font-semibold text-sm text-black dark:text-white">{p.name}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTogglePlayer(p);
                                }}
                                className="text-red-500 font-bold hover:text-red-600"
                              >
                                ✕
                              </button>
                            </div>
                            <div className="text-xs leading-tight text-black dark:text-white">
                              <div>{p.position.split("|")[0]} - {p.team}</div>
                              <div>{p.archetype}</div>
                            </div>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {["Rarity", "OVR", "Height", "Weight (lbs.)"].map((label) => (
                    <tr key={label}>
                      <td className={`font-bold border px-2 py-1 text-center ${theme === 'dark' ? 'bg-[#155dfc] text-white' : 'bg-blue-600 text-white'}`} style={{ borderColor }}>
                        {label}
                      </td>
                      {validPlayers.map((p) => {
                        let value = "-";
                        let displayValue = "-";
                        
                        if (label === "Rarity") {
                          value = p.rarity;
                          displayValue = p.rarity;
                          const rarityRank = {
                            "Starter": 1,
                            "Uncommon": 2,
                            "Rare": 3,
                            "Epic": 4,
                            "Iconic": 5,
                            "Mythic": 6,
                            "Marvel": 7
                          };
                          value = rarityRank[p.rarity] || 0;
                        }
                        if (label === "OVR") {
                          value = p.ovr;
                          displayValue = p.ovr;
                        }
                        if (label === "Height") {
                          value = p.height;
                          displayValue = formatHeight(p.height);
                        }
                        if (label === "Weight (lbs.)") {
                          value = p.weight;
                          displayValue = p.weight;
                        }

                        return (
<td
  key={p.id}
  className={`border px-2 py-1 text-center ${getHighlightClass(null, value, label)}`}
  style={{ 
    borderColor, 
    color: getHighlightClass(null, value, label) === '' && theme === 'dark' ? '#ffffff' : '#000000' 
  }}
>
  {displayValue}
</td>
                        );
                      })}
                    </tr>
                  ))}

                  {STAT_GROUPS.map((group) => (
                    <React.Fragment key={group.label}>
                      <tr className={theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}>
                        <td
                          className={`border px-2 py-2 text-left font-bold text-lg ${theme === 'dark' ? 'text-white' : ''}`}
                          style={{ borderColor }}
                        >
                          {group.label}
                        </td>
                        {validPlayers.map((p) => {
                          const overallValue = p.stats?.[group.label]?.overall ?? "N/A";
                          return (
                            <td
                              key={p.id}
                              className={`border px-2 py-2 text-center font-bold ${
                                theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-200 text-gray-900'
                              }`}
                              style={{ borderColor }}
                            >
                              {overallValue}
                            </td>
                          );
                        })}
                      </tr>
                      {group.stats.map((stat) => (
                        <tr key={stat}>
                          <td className={`font-bold border px-2 py-1 text-center ${theme === 'dark' ? 'bg-[#155dfc] text-white' : 'bg-blue-600 text-white'}`} style={{ borderColor }}>
                            {stat}
                          </td>
                          {validPlayers.map((p) => {
                            const val =
                              p.stats.Quickness?.[stat] ||
                              p.stats.Physical?.[stat] ||
                              p.stats.Mental?.[stat] ||
                              p.stats.Passing?.[stat] ||
                              p.stats.Receiving?.[stat] ||
                              p.stats.Rushing?.[stat] ||
                              p.stats.Blocking?.[stat] ||
                              p.stats.Coverage?.[stat] ||
                              p.stats["Pass Rush"]?.[stat] ||
                              p.stats["Run Stop"]?.[stat] ||
                              p.stats.Kicking?.[stat] ||
                              p.stats.Returning?.[stat] ||
                              "N/A";
                            return (
<td
  key={p.id}
  className={`border px-2 py-1 text-center ${getHighlightClass(stat, val)}`}
  style={{ 
    borderColor, 
    color: getHighlightClass(stat, val) === '' && theme === 'dark' ? '#ffffff' : '#000000' 
  }}
>
  {val}
</td>
                            );
                          })}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
