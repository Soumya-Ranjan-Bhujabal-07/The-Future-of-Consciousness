import { Chapter } from "../types";
import { chapter1 } from "./chapters/chapter1";
import { chapter2 } from "./chapters/chapter2";
import { chapter3 } from "./chapters/chapter3";
import { chapter4 } from "./chapters/chapter4";
import { chapter5 } from "./chapters/chapter5";
import { chapter6 } from "./chapters/chapter6";
import { chapter7 } from "./chapters/chapter7";
import { chapter8 } from "./chapters/chapter8";
import { chapter9 } from "./chapters/chapter9";
import { chapter10 } from "./chapters/chapter10";
import { references } from "./chapters/references";

export const PAPER_TITLE = "The Future of Consciousness: Brain–Computer Interfaces, Human Enhancement, and Perspectives on Life Beyond the Brain";

export const PAPER_ABSTRACT = "Consciousness remains one of the most profound and contested subjects in human inquiry. Despite extraordinary advances in neuroscience, psychology, philosophy, and artificial intelligence, no universally accepted explanation exists for how subjective experience emerges from physical processes in the brain. Simultaneously, rapid developments in Brain–Computer Interfaces (BCIs), neural engineering, machine learning, and computational neuroscience have begun to transform theoretical discussions about consciousness into practical scientific and technological challenges. Technologies that can decode neural activity, restore lost sensory functions, and facilitate direct communication between brains and computers raise fundamental questions regarding the nature of mind, personal identity, and the future of human existence. This research paper investigates consciousness through an interdisciplinary framework that integrates neuroscience, philosophy, psychology, religious studies, and emerging technologies. First, the study examines major theories of consciousness, including materialism, dualism, Integrated Information Theory, and Global Workspace Theory. Second, it explores the historical development and future potential of Brain–Computer Interfaces, analysing their implications for cognitive enhancement, memory augmentation, and human–AI integration. Third, the paper investigates psychological explanations for supernatural beliefs, including beliefs in ghosts, spirits, reincarnation, and life after death. Fourth, scientific, philosophical, and religious perspectives concerning consciousness after biological death are critically evaluated. Finally, the study examines future possibilities such as mind uploading, artificial consciousness, digital immortality, and human-machine hybrids. The central argument of this paper is that advances in neural technology are reshaping traditional assumptions about consciousness, identity, mortality, and the relationship between mind and matter. Although current scientific evidence strongly supports the dependence of consciousness upon brain activity, emerging technologies increasingly blur the boundaries between biological and digital forms of cognition. Consequently, future developments may require humanity to reconsider long-standing distinctions among life and death, human and machine, and natural and supernatural conceptions of consciousness.";

export const PAPER_KEYWORDS = [
  "Consciousness",
  "Brain–Computer Interfaces",
  "Human Enhancement",
  "Artificial Intelligence",
  "Mind Uploading",
  "Digital Immortality",
  "Near-Death Experiences",
  "Philosophy of Mind",
  "Neuroscience",
  "Cognitive Science"
];

export const CHAPTERS: Chapter[] = [
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
  chapter7,
  chapter8,
  chapter9,
  chapter10
];

export { references as REFERENCES };
export type { ReferenceGroup } from "./chapters/references";
