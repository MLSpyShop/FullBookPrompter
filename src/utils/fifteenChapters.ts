import { Chapter } from "../types";
import { ensureChapterWordCount } from "./chapterEnricher";

export function generateFifteenChapters(cleanTopic: string, authorName: string): Chapter[] {
  const t = cleanTopic || "The Monograph";
  const a = authorName || "The Author";
  const lower = t.toLowerCase();

  const isCannabis = /\b(cannabis|marijuana|weed|hemp|cannabinoid|thc|cbd|cultivation|dispensary)\b/i.test(lower);
  const isBusiness = /\b(business|finance|investing|market|startup|corporate|management|economy|real estate)\b/i.test(lower);
  const isMedical = /\b(medicine|medical|health|clinical|disease|doctor|patient|pharma|biology|psychology)\b/i.test(lower);

  let rawChapters: Chapter[];

  if (isCannabis) {
    rawChapters = [
      {
        number: 1,
        title: "Botanical Foundations, Taxonomy, and Phytochemistry",
        subtitle: "Morphological Differentiation, Glandular Trichomes, and Cannabinoid Biosynthesis",
        epigraph: {
          quote: "To understand the plant, one must first understand its evolutionary chemistry.",
          attribution: "Botanical Inquiry Axiom",
        },
        abstract: "Establishes the biological classification of Cannabis sativa L., exploring monotypic versus polytypic taxonomic debates, glandular trichome morphology, and the enzymatic biosynthesis of phytocannabinoids.",
        sections: [
          {
            heading: "1.1 Taxonomic Lineage and the Polytypic Debate",
            content: "The botanical taxonomy of the genus Cannabis has been contested since Carl Linnaeus first classified Cannabis sativa in 1753 and Jean-Baptiste Lamarck distinguished Cannabis indica in 1785. Modern phylogenomic analyses confirm that while phenotypic variation in leaflet morphology and stature is pronounced, high interfertility indicates a single, highly polymorphic species with distinct geographic chemotypes (Small, 2017; Clarke & Merlin, 2013).",
          },
          {
            heading: "1.2 Glandular Trichomes and Secretory Architecture",
            content: "Phytocannabinoids and terpenes are synthesized predominantly within the heads of capitate-stalked glandular trichomes on floral calyxes and bracts. These specialized epidermal structures function as biochemical factories, utilizing plastidic methylerythritol 4-phosphate (MEP) pathways to produce geranyl diphosphate (GPP) and polyketide pathways to synthesize olivetolic acid (Sirikantaramas et al., 2005).",
          },
          {
            heading: "1.3 Enzymatic Cascade of Cannabinoid Biosynthesis",
            content: "The condensation of GPP and olivetolic acid yields cannabigerolic acid (CBGA), the primary biochemical stem molecule. Specialized synthases (THCA synthase, CBDA synthase, and CBCA synthase) subsequently catalyze the stereospecific conversion of CBGA into acidic precursor molecules before post-harvest decarboxylation converts them to active neutral forms.",
          },
        ],
        caseStudy: {
          title: "Case Study: Chemotypic Characterization of Commercial Cultivars",
          context: "A commercial botanical research lab in Oregon sought to classify 120 commercial cannabis strains labeled with folklore nomenclature ('Sativa' and 'Indica') to determine whether colloquial labeling correlated with verified chemical phenotypes.",
          intervention: "Researchers performed high-performance liquid chromatography (HPLC) and gas chromatography-mass spectrometry (GC-MS) across all 120 cultivars, measuring 14 cannabinoids and 32 terpenes, followed by principal component analysis (PCA).",
          results: "The analytical data demonstrated no statistically valid chemical separation between commercial 'Indica' and 'Sativa' labels. Instead, cultivars clustered into three distinct chemotypic clusters based on myrcene-dominant, terpinolene-dominant, and caryophyllene/limonene-dominant profiles, demonstrating that chemovar profiling must replace legacy marketing taxonomy.",
        },
        takeaways: [
          "Colloquial 'Indica' and 'Sativa' strain names do not reliably predict chemical profile or pharmacological effects.",
          "Capitate-stalked glandular trichomes represent the primary site of cannabinoid and terpene synthesis.",
          "CBGA serves as the indispensable enzymatic precursor for THCA, CBDA, and CBCA synthesis.",
        ],
        discussionQuestions: [
          "Why have commercial markets relied on morphological labels rather than chemotype classification?",
          "How can analytical laboratory standards accelerate consumer education regarding cannabinoid ratios?",
        ],
      },
      {
        number: 2,
        title: "The Human Endocannabinoid System",
        subtitle: "Receptors, Endogenous Ligands, and Retrograde Neuromodulation",
        epigraph: {
          quote: "The discovery of the endocannabinoid system revealed an ancient biological homeostat running through every vertebrate.",
          attribution: "Dr. Lumír Hanuš",
        },
        abstract: "Explores the neurobiology of the endocannabinoid system (ECS), focusing on CB1 and CB2 G-protein coupled receptors, endogenous lipid ligands (AEA and 2-AG), enzymatic degradation, and retrograde synaptic transmission.",
        sections: [
          {
            heading: "2.1 Receptor Distribution: CB1, CB2, and Novel Targets",
            content: "The endocannabinoid system comprises G-protein coupled receptors widely expressed throughout the central and peripheral nervous systems. CB1 receptors predominate in the cerebral cortex, basal ganglia, hippocampus, and cerebellum, mediating psychoactive, cognitive, and antinociceptive responses. CB2 receptors are located primarily on immune cells, microglial tissues, and peripheral organs, modulating inflammation and immune homeostasis (Devane et al., 1992; Pertwee, 2008).",
          },
          {
            heading: "2.2 Endocannabinoid Ligands: Anandamide and 2-Arachidonoylglycerol",
            content: "Unlike classical neurotransmitters stored in synaptic vesicles, endocannabinoids are lipid-derived messengers synthesized on demand from membrane phospholipid precursors. N-arachidonoylethanolamine (anandamide or AEA) acts as a partial agonist at CB1, while 2-arachidonoylglycerol (2-AG) is present in higher concentrations and acts as a full agonist at both CB1 and CB2.",
          },
          {
            heading: "2.3 Retrograde Synaptic Transmission and Homeostasis",
            content: "Endocannabinoids uniquely travel in a retrograde direction: synthesized in post-synaptic neurons in response to depolarization and intracellular calcium influx, they diffuse backward across the synaptic cleft to activate pre-synaptic CB1 receptors. This activation suppresses voltage-gated calcium channels, inhibiting downstream release of excitatory glutamate or inhibitory GABA, thereby fine-tuning neural homeostasis.",
          },
        ],
        caseStudy: {
          title: "Case Study: Clinical Endocannabinoid Deficiency in Chronic Pain",
          context: "A clinical cohort of fibromyalgia and treatment-resistant migraine patients exhibited refractory symptoms unaddressed by conventional non-steroidal anti-inflammatory drugs (NSAIDs) or opiates.",
          intervention: "Researchers implemented a personalized cannabinoid titration protocol utilizing balanced 1:1 THC:CBD whole-plant oral formulations, alongside metabolic monitoring of circulating endocannabinoid plasma biomarkers.",
          results: "Over six months, 78% of enrolled patients reported greater than 50% reductions in self-reported pain scores, alongside significant improvements in sleep architecture and reductions in prescription opiate dependence.",
        },
        takeaways: [
          "The ECS operates primarily as a retrograde inhibitory neuromodulatory network maintaining biological homeostasis.",
          "CB1 receptors mediate central nervous system signaling, while CB2 receptors regulate peripheral immune responses.",
          "Endocannabinoids are synthesized on-demand from membrane lipids rather than pre-stored in vesicular compartments.",
        ],
        discussionQuestions: [
          "How does understanding retrograde signaling inform targeted drug design for neurodegenerative disorders?",
          "What clinical evidence supports Dr. Ethan Russo's clinical endocannabinoid deficiency hypothesis?",
        ],
      },
      {
        number: 3,
        title: "Pharmacology of Major and Minor Cannabinoids",
        subtitle: "Mechanisms of Action, Pharmacokinetics, and Receptor Affinities",
        epigraph: {
          quote: "The plant is not a single compound, but a poly-pharmaceutical factory.",
          attribution: "Pharmacological Review",
        },
        abstract: "Comprehensive pharmacological analysis of delta-9-THC, cannabidiol (CBD), cannabigerol (CBG), cannabinol (CBN), cannabichromene (CBC), and tetrahydrocannabivarin (THCV), evaluating bioavailability, metabolic pathways, and therapeutic index.",
        sections: [
          {
            heading: "3.1 Delta-9-Tetrahydrocannabinol: Efficacy, Tolerance, and Metabolism",
            content: "Delta-9-THC acts as a partial agonist at CB1 and CB2 receptors. Inhaled THC reaches peak plasma concentrations within 5-10 minutes with bioavailability ranging from 10-35%, whereas oral ingestion undergoes extensive first-pass hepatic metabolism by cytochrome P450 enzymes (CYP2C9 and CYP3A4) to form 11-hydroxy-THC, a metabolite exhibiting greater blood-brain barrier permeability and psychotropic potency (Huestis, 2007).",
          },
          {
            heading: "3.2 Cannabidiol: Negative Allosteric Modulation and Non-Cannabinoid Receptors",
            content: "Cannabidiol exhibits low affinity for the orthosteric binding sites of CB1 and CB2, functioning instead as a negative allosteric modulator of CB1, which blunts THC-induced tachycardia and anxiety. Furthermore, CBD acts as an agonist at 5-HT1A serotonin receptors, activates TRPV1 ion channels, and inhibits the enzymatic breakdown of anandamide by fatty acid amide hydrolase (FAAH) (Russo et al., 2005; Pertwee, 2008).",
          },
          {
            heading: "3.3 Minor Cannabinoids: CBG, CBN, CBC, and THCV",
            content: "Emerging pharmacology reveals potent therapeutic actions among minor cannabinoids. Cannabigerol (CBG) acts as an alpha-2 adrenergic agonist and 5-HT1A antagonist, demonstrating potent antibacterial and anti-inflammatory properties. Cannabinol (CBN), an oxidative degradation product of THC, demonstrates sedative synergy, while THCV exhibits biphasic metabolic modulation, functioning as a CB1 antagonist at low doses and agonist at high doses.",
          },
        ],
        caseStudy: {
          title: "Case Study: High-CBD Formulation in Pediatric Intractable Epilepsy",
          context: "Pediatric patients diagnosed with Dravet and Lennox-Gastaut syndromes experiencing over 30 generalized tonic-clonic seizures per month despite multi-drug anti-epileptic regimens.",
          intervention: "Administration of pharmaceutical-grade, plant-derived purified CBD oral solution titrated from 5 mg/kg/day up to 20 mg/kg/day, monitored in conjunction with clobazam serum concentrations.",
          results: "Clinical trial results demonstrated a median 44% reduction in convulsive seizure frequency, with 5% of patients achieving complete seizure freedom and paving the way for FDA drug approvals.",
        },
        takeaways: [
          "Hepatic metabolism of oral THC produces 11-hydroxy-THC, significantly altering onset, duration, and psychoactive intensity.",
          "CBD acts as a negative allosteric modulator of CB1 and engages multiple non-endocannabinoid physiological pathways.",
          "Minor cannabinoids like CBG and THCV offer targeted pharmacological benefits without significant cognitive intoxication.",
        ],
        discussionQuestions: [
          "How does oral 11-hydroxy-THC pharmacokinetics complicate consumer dosing in manufactured edibles?",
          "What mechanisms explain CBD's ability to modulate THC-induced cognitive and cardiovascular side effects?",
        ],
      },
      {
        number: 4,
        title: "The Terpenoid and Flavonoid Spectrum",
        subtitle: "Aromatic Profiles, Synergy, and the Entourage Effect",
        epigraph: {
          quote: "Aroma is the signature of botanical intent.",
          attribution: "Phytomedicinal Principle",
        },
        abstract: "Examines the chemical diversity of cannabis terpenes (myrcene, beta-caryophyllene, limonene, pinene, linalool) and flavonoids (cannaflavins), evaluating biological mechanisms supporting synergistic therapeutic outcomes.",
        sections: [
          {
            heading: "4.1 The Biochemical Spectrum of Cannabis Terpenoids",
            content: "Terpenoids are volatile aromatic hydrocarbons composed of repeating isoprene units. Monoterpenes (such as beta-myrcene, alpha-pinene, and d-limonene) dominate the fresh floral canopy, contributing sharp, volatile aromas. Sesquiterpenes (such as beta-caryophyllene and humulene) possess heavier molecular structures, volatilizing at higher temperatures and contributing rich peppery undertones (Russo, 2011; Booth & Bohlmann, 2019).",
          },
          {
            heading: "4.2 Beta-Caryophyllene: A Dietary Cannabinoid",
            content: "Beta-caryophyllene is unique among terpenes as it directly binds as a selective full agonist to peripheral CB2 receptors without activating central CB1 receptors. Present in black pepper, cloves, and cannabis, it delivers potent anti-inflammatory and gastric cytoprotective effects without psychotropic alteration (Gertsch et al., 2008).",
          },
          {
            heading: "4.3 Cannaflavins and Specialized Flavonoids",
            content: "Cannabis synthesizes specialized prenylated flavonoids, designated cannaflavin A, B, and C, found exclusively in Cannabis sativa. These compounds demonstrate anti-inflammatory activity up to thirty times more potent than aspirin in inhibiting prostaglandin E2 synthesis, highlighting the deep therapeutic value of non-cannabinoid secondary metabolites.",
          },
        ],
        caseStudy: {
          title: "Case Study: Whole-Plant Extract vs. Single-Molecule Cannabinoids",
          context: "Oncology palliative care patients undergoing chemotherapy experiencing severe nausea, anorexia, and neuropathic pain refractory to synthetic single-molecule THC (dronabinol).",
          intervention: "Transitioned patients from dronabinol to a full-spectrum whole-plant ethanol extract containing matched THC potency alongside 4.5% terpenes (limonene, myrcene, beta-caryophyllene) and minor cannabinoids.",
          results: "Patients reported superior anti-emetic relief and significantly fewer dysphoric or anxiety episodes, corroborating the clinical reality of the whole-plant entourage effect.",
        },
        takeaways: [
          "Beta-caryophyllene acts as a dietary functional CB2 agonist, bridging the gap between terpenes and cannabinoids.",
          "Cannaflavins provide exceptional anti-inflammatory potency independent of cannabinoid receptor binding.",
          "Full-spectrum formulations often provide superior therapeutic efficacy and tolerability compared to isolated isolates.",
        ],
        discussionQuestions: [
          "What scientific methodologies are best suited to rigorously isolate individual components of the entourage effect?",
          "How can product formulators preserve volatile monoterpenes during commercial manufacturing?",
        ],
      },
      {
        number: 5,
        title: "Agronomy, Breeding, and Cultivar Selection",
        subtitle: "Inheritance Genetics, Phenotypic Plasticity, and Tissue Culture",
        epigraph: {
          quote: "The seed contains the architectural blueprint; the farmer decides how clearly it is expressed.",
          attribution: "Agronomic Maxim",
        },
        abstract: "Explores breeding paradigms, Mendelian inheritance of cannabinoid traits, photoperiod vs autoflowering genetics, clonal propagation, and the role of meristem tissue culture in eliminating viral pathogens.",
        sections: [
          {
            heading: "5.1 Mendelian Inheritance and Chemotype Genetics",
            content: "Cannabinoid production in cannabis follows co-dominant alleles governing THCA synthase and CBDA synthase expression. Plants homozygous for THCA synthase express Chemotype I (high THC, low CBD); plants heterozygous for both express Chemotype II (balanced THC:CBD); and plants homozygous for CBDA synthase express Chemotype III (high CBD, low THC) (de Meijer et al., 2003).",
          },
          {
            heading: "5.2 Clonal Selection and Pheno-Hunting",
            content: "Commercial cannabis relies overwhelmingly on asexual vegetative propagation to preserve elite female chemotypes. Conducting structured pheno-hunts from seed populations allows cultivators to evaluate vigor, node spacing, resin density, pest resistance, and terpene profiles under identical environmental pressures before selecting mother plants.",
          },
          {
            heading: "5.3 Micropropagation and Meristem Tissue Culture",
            content: "Continuous vegetative cutting over years leads to genetic senescence, epigenetic drift, and systemic pathogen accumulation, particularly Hop Latent Viroid (HLVd). Meristematic tissue culture in sterile agar medium isolates pathogen-free cell clusters from growing shoot tips, allowing commercial operations to remediate infected genetics and bank elite germplasm indefinitely.",
          },
        ],
        caseStudy: {
          title: "Case Study: Eradication of Hop Latent Viroid (HLVd) in Commercial Canopies",
          context: "A commercial facility managing 30,000 square feet observed 'duds'—stunted flowering, 60% loss in trichome density, and brittle branches across premium mother stocks.",
          intervention: "Instituted qPCR molecular testing confirming 40% HLVd prevalence. Deployed shoot apical meristem tissue culture remediation, combined with strict scalpel sterilization and clean-room quarantine protocols.",
          results: "Within nine months, 100% of production mother stocks were certified viroid-free, restoring full average dry yields from 38 grams/sq.ft back to 64 grams/sq.ft and preserving brand genetic lineage.",
        },
        takeaways: [
          "Cannabinoid ratios are governed by co-dominant alleles determining enzyme competition for CBGA.",
          "Hop Latent Viroid represents an existential threat to commercial yields requiring qPCR testing and tissue culture remediation.",
          "Micropropagation enables disease-free genetic banking and uniform commercial canopy development.",
        ],
        discussionQuestions: [
          "How will marker-assisted genetic selection accelerate the development of drought-resistant cannabis cultivars?",
          "What are the biosecurity risks associated with open genetic exchange across commercial borders?",
        ],
      },
      {
        number: 6,
        title: "Controlled Environment Agriculture & Climate Dynamics",
        subtitle: "Photobiology, Vapor Pressure Deficit, and HVAC Engineering",
        epigraph: {
          quote: "Light is both energy and information to the plant canopy.",
          attribution: "Horticultural Engineer",
        },
        abstract: "Technical analysis of indoor cultivation design: photosynthetic photon flux density (PPFD), daily light integral (DLI), spectrum optimization, vapor pressure deficit (VPD) psychrometric charts, and sealed HVAC load balancing.",
        sections: [
          {
            heading: "6.1 Photobiology: PPFD, DLI, and Spectral Quality",
            content: "Modern cultivation engineering has transitioned from high-pressure sodium (HPS) fixtures to high-efficiency LED arrays. Cannabis exhibits exceptional photosynthetic capacity, utilizing Photosynthetic Photon Flux Densities (PPFD) up to 1,500 umol/m2/s when supplied with supplemental atmospheric carbon dioxide (1,200-1,500 ppm). Balancing Daily Light Integral (DLI) across 18-hour vegetative and 12-hour flowering cycles dictates biomass accumulation.",
          },
          {
            heading: "6.2 Psychrometrics and Vapor Pressure Deficit (VPD)",
            content: "Vapor pressure deficit (VPD) represents the difference between the moisture pressure inside the leaf stoma and the surrounding air. In vegetative phases, target VPD sits between 0.8-1.1 kPa to encourage transpiration and nutrient uptake; in generative flowering phases, VPD is elevated to 1.2-1.5 kPa to suppress fungal proliferation while maintaining metabolic drive.",
          },
          {
            heading: "6.3 HVAC and Dehumidification Load Engineering",
            content: "Transpiration in high-density indoor canopies returns virtually 95-98% of delivered irrigation water into the room air as moisture. Engineering sealed indoor environments requires specialized chilled-water or precision direct-expansion HVAC systems capable of extracting hundreds of pints of water per hour while maintaining tight temperature tolerances (+/- 1 degree F) across day and night cycles.",
          },
        ],
        caseStudy: {
          title: "Case Study: LED Transition and Closed-Loop HVAC Optimization",
          context: "A legacy warehouse facility operating 400 double-ended HPS fixtures faced severe summer cooling bottlenecks and escalating electricity bills exceeding $45,000 monthly.",
          intervention: "Retrofitted cultivation bays with full-spectrum broad-band LED fixtures delivering 2.9 umol/Joule, supplemented with CO2 injection at 1,400 ppm and modulated reheat HVAC dehumidifiers.",
          results: "Achieved a 38% reduction in total facility electrical consumption, while canopy yields increased from 1.3 grams per watt to 2.2 grams per watt with enriched terpene retention due to lower ambient leaf surface temperatures.",
        },
        takeaways: [
          "Cannabis can efficiently utilize PPFD levels up to 1,500 umol/m2/s when paired with elevated CO2 and nutrient delivery.",
          "Targeting specific VPD ranges prevents fungal infection and maximizes transpirational nutrient flow.",
          "Dehumidification sizing must match the total volume of daily irrigation delivered to the room canopy.",
        ],
        discussionQuestions: [
          "How does leaf temperature difference between HPS and LED lighting alter ideal room ambient setpoints?",
          "What economic trade-offs exist between fully indoor CEA facilities and hybrid light-deprivation greenhouses?",
        ],
      },
      {
        number: 7,
        title: "Soil Microbiology, Substrates, and Fertigation",
        subtitle: "Rhizosphere Dynamics, Mineral Nutrition, and Irrigation Automation",
        epigraph: {
          quote: "Feed the soil, and the soil will feed the root; feed the root, and the plant will express its truth.",
          attribution: "Soil Science Maxim",
        },
        abstract: "Explores the rhizosphere biology of cannabis, comparing living organic soil networks with sterile inert substrates (rockwool, coco coir), mineral nutrition curves, electrical conductivity (EC), and automated pulse fertigation.",
        sections: [
          {
            heading: "7.1 Essential Mineral Nutrition: N-P-K and Secondary Elements",
            content: "Cannabis exhibits distinct nutritional demands across developmental stages. Vegetative growth requires elevated nitrogen (N) for structural amino acid and chlorophyll synthesis; transition to floral induction demands reduced nitrogen and increased phosphorus (P) and potassium (K) for ATP generation, osmotic regulation, and resin synthesis. Secondary elements—calcium, magnesium, and sulfur—serve as vital enzymatic co-factors.",
          },
          {
            heading: "7.2 Living Soil Ecology vs. Hydroponic Media",
            content: "Two dominant substrate philosophies govern modern production: living organic soil and sterile hydroponic substrates. Living soil relies on diverse mycorrhizal fungi, beneficial bacteria, and protozoa to cycle organic matter into bioavailable minerals, often enhancing complex aroma profiles. Conversely, inert coco coir or rockwool allows precision delivery of water-soluble mineral ions with instantaneous root uptake.",
          },
          {
            heading: "7.3 Automated Pulse Fertigation and Runoff Management",
            content: "Precision fertigation involves delivering calculated micro-doses of nutrient solution multiple times daily, guided by substrate moisture sensors measuring volumetric water content (VWC) and pore-water electrical conductivity (EC). Controlling irrigation dry-backs steers the plant between vegetative and generative morphological growth.",
          },
        ],
        caseStudy: {
          title: "Case Study: Sensor-Driven Pulse Fertigation in Coco Coir",
          context: "A commercial facility experienced intermittent nutrient lock-out and tip burn due to manual once-daily hand-watering causing extreme dry-backs and salt accumulation in coco media.",
          intervention: "Installed automated drip irrigation with TDR substrate probes, transitioning to 6-8 daily micro-irrigations calibrated to maintain runoff EC within 0.5 mS/cm of input solution.",
          results: "Root zone electrical conductivity stabilized within ideal ranges, resulting in a 24% increase in floral biomass and eliminating leaf necrosis across all flowering cultivars.",
        },
        takeaways: [
          "Nutritional requirements shift from nitrogen-dominant in vegetative growth to potassium-dominant in flowering.",
          "Automated pulse irrigation maintains steady rhizosphere osmotic pressure and prevents toxic salt accumulation.",
          "Substrate dry-back manipulation provides effective hormonal steering between vegetative and reproductive development.",
        ],
        discussionQuestions: [
          "How do living organic soil methods compare to inert hydroponics in life-cycle environmental impact?",
          "What mechanisms cause calcium-magnesium antagonism when growing in unbuffered coco coir?",
        ],
      },
      {
        number: 8,
        title: "Integrated Pest Management & Biosecurity",
        subtitle: "Biological Controls, Fungal Pathogens, and Zero-Pesticide Mandates",
        epigraph: {
          quote: "Prevention is the only sustainable pesticide.",
          attribution: "Agricultural Entomologist",
        },
        abstract: "Details pest and disease control in commercial cannabis under zero-pesticide legal constraints: predatory mites, entomopathogenic fungi, Powdery Mildew, Botrytis cinerea, Pythium, and facility biosecurity architecture.",
        sections: [
          {
            heading: "8.1 Major Arthropod Pests: Mites, Thrips, and Aphids",
            content: "Indoor monocultures provide ideal habitats for devastating agricultural pests, notably two-spotted spider mites (Tetranychus urticae), western flower thrips (Frankliniella occidentalis), and cannabis aphids (Phorodon cannabis). Because legal markets enforce strict zero-tolerance pesticide residue testing, growers cannot deploy systemic chemical insecticides, necessitating proactive biological solutions.",
          },
          {
            heading: "8.2 Biological Controls: Beneficial Insects and Entomopathogens",
            content: "Successful IPM architectures deploy standing armies of beneficial organisms: predatory mites (Phytoseiulus persimilis, Amblyseius swirskii, Neoseiulus californicus) that feed on target pests, beneficial nematodes (Steinernema feltiae) for substrate control, and entomopathogenic fungi like Beauveria bassiana.",
          },
          {
            heading: "8.3 Fungal Pathogen Control: Botrytis and Powdery Mildew",
            content: "Fungal infections, particularly Botrytis cinerea (bud rot) and Golovinomyces ambrosiae (powdery mildew), represent the leading causes of harvest loss. Control requires environmental management (preventing dew-point condensation), regular ultraviolet-C surface sanitation, and biological fungicides based on Bacillus subtilis or Trichoderma strains.",
          },
        ],
        caseStudy: {
          title: "Case Study: Transitioning to 100% Biological IPM in 40,000 Sq. Ft. Facility",
          context: "A multi-state operator faced repeated state regulatory quarantine holds due to trace detection of banned synthetic fungicide residues applied during early vegetative cycles.",
          intervention: "Halted all synthetic chemical applications; established positive-pressure air showers at entrances; instituted weekly scheduled inoculations of Amblyseius swirskii and Beauveria bassiana; deployed continuous particulate HEPA air filtration.",
          results: "Achieved 100% first-pass clean lab tests for 18 consecutive months with pest damage kept beneath a 2% commercial threshold, protecting brand reputation and licensing status.",
        },
        takeaways: [
          "Stringent lab testing for chemical residues makes biological IPM the only legally viable pest strategy.",
          "Preventive inoculations of beneficial predatory insects must occur before pest populations reach visible thresholds.",
          "Environmental moisture control and airflow prevent dew-point condensation, the primary trigger for Botrytis spores.",
        ],
        discussionQuestions: [
          "Why are traditional agricultural pesticides fundamentally incompatible with inhalable cannabis products?",
          "How can facilities design physical biosecurity barriers to prevent vector introduction by workers?",
        ],
      },
      {
        number: 9,
        title: "Post-Harvest Science: Drying, Curing, and Storage",
        subtitle: "Water Activity, Moisture Equilibrium, and Degradation Kinetics",
        epigraph: {
          quote: "A master grower can lose six months of work in six days of poor curing.",
          attribution: "Post-Harvest Technologist",
        },
        abstract: "Scientific breakdown of the drying and curing process: thermodynamics of moisture evaporation, water activity (aw) thresholds, enzymatic chlorophyll degradation, and vacuum/nitrogen-flushed storage to arrest oxidation.",
        sections: [
          {
            heading: "9.1 Thermodynamics of Drying: Temperature and Relative Humidity",
            content: "Harvested floral biomass contains approximately 75-80% moisture by weight and must be systematically brought down to 10-12% moisture content. Standard commercial drying targets the '60/60 rule' (60 degrees F and 60% relative humidity) for 10-14 days. This controlled rate prevents case hardening—where the outer leaf surface dries prematurely while moisture remains trapped in the central stem.",
          },
          {
            heading: "9.2 The Biochemistry of Curing and Chlorophyll Degradation",
            content: "Curing is not merely drying; it is a controlled aerobic aging process. Over several weeks in sealed containers at 60-65% relative humidity, endogenous plant enzymes break down harsh starches and chlorophyll into simpler sugars, eliminating the astringent 'grassy' taste and yielding a smooth, flavorful burn.",
          },
          {
            heading: "9.3 Water Activity (aw) and Long-Term Preservation",
            content: "Water activity (aw) measures the energy status of water in a product and dictates microbial vulnerability. Cannabis must be stabilized between 0.55 and 0.65 aw. Values above 0.65 permit Aspergillus and Penicillium mold proliferation; values below 0.55 cause rapid terpene volatilization and trichome degradation.",
          },
        ],
        caseStudy: {
          title: "Case Study: Climate-Controlled Dry Rooms vs. Rapid Heated Dehydration",
          context: "A high-volume producer attempted to shorten drying cycles from 12 days to 72 hours using elevated heat (85 degrees F) and low humidity (30%) to accelerate processing throughput.",
          intervention: "Comparative chemical testing conducted between rapid-dried flowers and gentle cold-cured control samples harvested from the exact same cultivation zone.",
          results: "Rapid-dried flower suffered a 42% loss in total monoterpenes (primarily myrcene and limonene), resulting in harsh smoke and a 30% reduction in wholesale market price compared to the cold-cured control.",
        },
        takeaways: [
          "Drying at 60 degrees F and 60% RH preserves fragile monoterpenes that evaporate at higher temperatures.",
          "Water activity must be strictly maintained between 0.55 and 0.65 to prevent mold while preserving terpene retention.",
          "Gentle enzymatic breakdown of chlorophyll during curing is essential for premium combustible flower.",
        ],
        discussionQuestions: [
          "How does water activity measurement offer greater safety assurance than traditional total moisture percentage?",
          "What packaging technologies best prevent terpene oxidation during multi-month retail dispensary shelf storage?",
        ],
      },
      {
        number: 10,
        title: "Extraction Sciences and Processing Methodologies",
        subtitle: "Hydrocarbons, Supercritical CO2, Ethanol, and Solventless Rosin",
        epigraph: {
          quote: "Extraction is the art of concentrating botanical essence while excluding plant matrix.",
          attribution: "Chemical Processing Engineer",
        },
        abstract: "Evaluates industrial extraction technologies: light hydrocarbon closed-loop systems (BHO), sub- and supercritical carbon dioxide, cryogenic ethanol extraction, and mechanical solventless separation (ice-water hash and heated rosin press).",
        sections: [
          {
            heading: "10.1 Light Hydrocarbon Extraction (Butane / Propane)",
            content: "Light hydrocarbon solvents (n-butane and propane) are favored for capturing high-terpene full-spectrum extracts (HTFSE) from freshly frozen biomass ('live resin'). Operating in Class 1 Division 1 (C1D1) explosion-proof facilities at cryogenic temperatures (-40 to -80 degrees C), hydrocarbons selectively dissolve cannabinoid and terpene oils while excluding polar chlorophylls and plant waxes.",
          },
          {
            heading: "10.2 Supercritical and Subcritical CO2 Extraction",
            content: "Carbon dioxide extraction utilizes high pressure and temperature to transition CO2 beyond its critical point (31.1 degrees C, 73.9 bar), where it exhibits fluid-like density and gas-like diffusivity. Modulating pressure and temperature parameters allows tunable selectivity between volatile light terpenes and dense cannabinoids, producing pure oil free of residual organic solvents.",
          },
          {
            heading: "10.3 Solventless Mechanical Separation: Ice Water and Rosin",
            content: "Solventless processing relies on physical separation rather than chemical dissolution. Agitating freshly frozen flowers in ice-cold water hardens and snaps glandular trichome heads, which are sieved through micron mesh screens (25 to 160 microns) into hashish. Subjecting this hashish to calibrated heat (160-200 degrees F) and hydraulic pressure liquifies the resin into solventless 'hash rosin'.",
          },
        ],
        caseStudy: {
          title: "Case Study: Scaling Commercial Solventless Rosin Operations",
          context: "An artisanal extraction brand sought to transition from small-batch manual washing to an industrial 500-gallon vortex ice-water separation system without compromising trichome cuticle integrity.",
          intervention: "Engineered a closed-loop chilled glycol jacketed vessel maintaining 32.5 degrees F, gentle fluid vortex agitation, and automated freeze-drying cycles to prevent oxidation.",
          results: "Increased single-run processing capacity six-fold while maintaining a 5.5% fresh-frozen yield of premium 90-120 micron melt, capturing 35% higher retail margins than hydrocarbon distillates.",
        },
        takeaways: [
          "Cryogenic hydrocarbon extraction preserves native plant terpene ratios from fresh frozen flower.",
          "CO2 extraction provides non-toxic, tunable selectivity ideal for pharmaceutical-grade formulations.",
          "Solventless mechanical separation commands premium retail prices due to the complete absence of chemical solvents.",
        ],
        discussionQuestions: [
          "Why is temperature control in ice-water washing critical to separating resin heads from stalks?",
          "How do capital expenditure and safety compliance costs compare between C1D1 hydrocarbon labs and solventless facilities?",
        ],
      },
      {
        number: 11,
        title: "Analytical Testing, Quality Assurance & cGMP",
        subtitle: "Chromatography, Contaminant Screening, and Laboratory Validation",
        epigraph: {
          quote: "Quality is never an accident; it is always the result of high intention, sincere effort, and skillful execution.",
          attribution: "Analytical Chemist",
        },
        abstract: "Technical overview of third-party analytical testing: HPLC potency quantification, GC-MS residual solvent analysis, ICP-MS heavy metals testing, qPCR microbial screening, and implementation of cGMP/ISO 17025 standards.",
        sections: [
          {
            heading: "11.1 High-Performance Liquid Chromatography (HPLC) for Potency",
            content: "HPLC is the regulatory gold standard for cannabinoid quantification. By running liquid solvent mobile phases through silica column stationary phases, HPLC separates acidic and neutral cannabinoids (THCA, THC, CBDA, CBD) without applying heat, preventing the false decarboxylation that occurs during traditional gas chromatography injection ports.",
          },
          {
            heading: "11.2 Residual Solvents, Heavy Metals, and Pesticide Screening",
            content: "Modern safety regulations enforce parts-per-million (ppm) or parts-per-billion (ppb) thresholds for toxic contaminants. Inductively Coupled Plasma Mass Spectrometry (ICP-MS) screens for the 'Big Four' heavy metals (lead, cadmium, arsenic, and mercury). Tandem LC-MS/MS and GC-MS/MS detect trace synthetic pesticide residues and mycotoxins.",
          },
          {
            heading: "11.3 ISO/IEC 17025 Accreditation and cGMP Manufacturing",
            content: "Commercial laboratories and manufacturing facilities must adhere to international quality benchmarks. ISO/IEC 17025 accreditation validates laboratory technical competence, calibration traceability, and testing repeatability, while Current Good Manufacturing Practices (cGMP - 21 CFR Part 111/211) mandate strict hygiene, lot tracing, and batch record validation.",
          },
        ],
        caseStudy: {
          title: "Case Study: Identifying and Remediating Heavy Metal Bioaccumulation",
          context: "A commercial indoor cultivator experienced sudden batch failures in state testing due to cadmium levels exceeding the 0.2 ppm threshold in final dried flower.",
          intervention: "Conducted systematic ICP-MS testing across input water, mineral fertilizer formulations, and growing substrates (coco coir and peat moss).",
          results: "Identified a low-cost bulk kelp meal additive as the sole source of heavy metal contamination. Removing the contaminated batch and switching to heavy-metal-certified organic amendments restored 100% clean test compliance.",
        },
        takeaways: [
          "HPLC testing allows precise quantification of acidic precursor cannabinoids without thermally decarboxylating the sample.",
          "Cannabis is a vigorous dynamic hyperaccumulator that readily draws heavy metals from contaminated water or soil amendments.",
          "cGMP certification and ISO 17025 validation are essential for international medical export and pharmaceutical supply chains.",
        ],
        discussionQuestions: [
          "How can state regulatory agencies prevent 'lab shopping' and standardize testing methodology between competing commercial labs?",
          "What factors contribute to sample variance when testing high-potency concentrates versus raw floral biomass?",
        ],
      },
      {
        number: 12,
        title: "Medical Applications and Clinical Therapeutics",
        subtitle: "Evidence-Based Indications, Dosing Protocols, and Patient Safety",
        epigraph: {
          quote: "The goal of clinical cannabinoid therapy is symptom control with minimum intoxication.",
          attribution: "Clinical Cannabis Specialist",
        },
        abstract: "Reviews clinical literature supporting medical cannabis: chronic neuropathic pain, epilepsy, oncology supportive care, spasticity in multiple sclerosis, palliative care, and personalized titration strategies.",
        sections: [
          {
            heading: "12.1 Chronic Pain Management and Opiate-Sparing Effects",
            content: "Chronic neuropathic and inflammatory pain represent the most common indications for medical cannabis. Cannabinoids modulate nociceptive pathways by suppressing spinal cord dorsal horn neurotransmission and reducing peripheral tissue inflammation. Clinical trials consistently demonstrate that adjunctive cannabinoid therapy enables patients to reduce opioid dosages by 40-60%, reducing overdose risk and improving functional mobility.",
          },
          {
            heading: "12.2 Neurological Disorders: Epilepsy, MS, and Movement",
            content: "Cannabinoids provide proven neuroprotective and anti-spasmodic benefits. The approval of botanical CBD (Epidiolex) for severe pediatric refractory epilepsies and 1:1 THC:CBD oromucosal spray (Sativex/Nabiximols) for multiple sclerosis spasticity demonstrates how pharmaceutical-grade formulations achieve rigorous clinical validation in neurology.",
          },
          {
            heading: "12.3 Clinical Titration Protocols and Harm Reduction",
            content: "Medical cannabis administration adheres to the clinical maxim 'start low and go slow.' Initiating therapy with micro-doses (e.g., 2.5 mg CBD or 1.25 mg THC) and titrating upward over several weeks prevents adverse psychotropic reactions, orthostatic hypotension, and rapid tolerance development, optimizing the therapeutic window.",
          },
        ],
        caseStudy: {
          title: "Case Study: Hospital-Based Inpatient Cannabinoid Consult Service",
          context: "An oncology hospital observed high rates of chemotherapy-induced nausea, cachexia, and breakthrough neuropathy in cancer patients experiencing intolerance to standard anti-emetics.",
          intervention: "Established a physician-supervised clinical cannabinoid consult service, developing standardized oral tincture protocols combining 5:1 CBD:THC daytime formulations with 1:1 nighttime formulations.",
          results: "Over 400 enrolled patients achieved a 65% reduction in nausea severity scores, documented an average 4.2 lb weight recovery over 8 weeks, and reported substantial reductions in acute anxiety.",
        },
        takeaways: [
          "Cannabinoids act synergistically with existing pain pathways, enabling substantial opiate dosage reductions.",
          "Clinical efficacy is optimized through gradual titration protocols that prevent tolerance and psychotropic distress.",
          "Whole-plant botanical formulations offer multiple active therapeutic agents compared to single-compound synthetics.",
        ],
        discussionQuestions: [
          "What barriers continue to prevent mainstream medical education from incorporating endocannabinoid pharmacology into medical school curricula?",
          "How do pharmacogenetic differences in CYP450 liver enzymes alter individual cannabinoid metabolism and dosing tolerance?",
        ],
      },
      {
        number: 13,
        title: "The Legal, Regulatory, and Policy Architecture",
        subtitle: "From Prohibition to Normalization: Federalism, Banking, and Taxation",
        epigraph: {
          quote: "Law is the structural boundary within which an entire industry must build its foundations.",
          attribution: "Cannabis Policy Scholar",
        },
        abstract: "Examines the legal transition of cannabis: the 1937 Marihuana Tax Act, the Controlled Substances Act of 1970, state-level adult-use licensing models, Section 280E federal tax penalties, and the SAFE Banking Act.",
        sections: [
          {
            heading: "13.1 The Historical Architecture of Prohibition",
            content: "Federal prohibition in the United States was codified through the Marihuana Tax Act of 1937, spearheaded by Federal Bureau of Narcotics Commissioner Harry Anslinger using racially biased rhetoric rather than medical consensus. The Controlled Substances Act of 1970 subsequently placed cannabis in Schedule I—falsely categorizing it as having no accepted medical use and a high potential for abuse alongside heroin.",
          },
          {
            heading: "13.2 State-Level Legalization Paradigms and Interstate Friction",
            content: "Beginning with California's Proposition 215 in 1996 and Colorado's Amendment 64 in 2012, states constructed independent regulatory laboratories. Because cannabis remains federally illegal, each state must operate as a closed economic island: all cultivation, processing, testing, and distribution must occur strictly within state borders, creating massive capital inefficiencies.",
          },
          {
            heading: "13.3 Internal Revenue Code Section 280E and Commercial Banking",
            content: "Internal Revenue Code Section 280E prevents businesses trafficking in Schedule I substances from deducting ordinary and necessary business expenses, including payroll, rent, and marketing. Consequently, legal cannabis enterprises face effective tax rates of 60-80% on net income. Simultaneously, federal anti-money-laundering statutes restrict access to commercial merchant processing and banking lines.",
          },
        ],
        caseStudy: {
          title: "Case Study: Navigating 280E Tax Disallowances in a Multi-Store Operation",
          context: "A retail dispensary chain generating $12 million in gross revenue faced an effective federal tax liability exceeding 70% of operating profit due to Section 280E deduction disallowances.",
          intervention: "Retained specialized tax counsel to perform formal cost-accounting separation: categorizing inventory storage, handling, and packaging strictly into Cost of Goods Sold (COGS, which remains deductible under IRC 471) while decoupling non-plant enterprise services.",
          results: "Reduced effective corporate tax rate by 22%, saving over $680,000 annually and preserving cash reserves required to weather wholesale market price compression.",
        },
        takeaways: [
          "State-by-state legalization without federal reform forces operators to duplicate supply chains in closed state silos.",
          "Section 280E imposes severe financial penalties by disallowing standard business deductions, elevating effective tax rates above 70%.",
          "Lack of access to federal banking and merchant processing remains the single largest operational friction in legal markets.",
        ],
        discussionQuestions: [
          "How would federal rescheduling from Schedule I to Schedule III alter the tax burden of licensed state operators under Section 280E?",
          "What interstate commerce models will emerge once federal prohibition is repealed?",
        ],
      },
      {
        number: 14,
        title: "Dispensary Operations, Supply Chain & Retail Economics",
        subtitle: "Seed-to-Sale Tracking, Margin Pressures, and Consumer Behavior",
        epigraph: {
          quote: "A retail dispensary is the interface where scientific agriculture meets public trust.",
          attribution: "Retail Operations Director",
        },
        abstract: "Analyzes commercial cannabis supply chain logistics, state-mandated track-and-trace systems (Metrc), retail store architecture, budtender education, inventory shrinkage, and wholesale price deflation.",
        sections: [
          {
            heading: "14.1 Seed-to-Sale Traceability: Metrc and RFID Architecture",
            content: "State compliance mandates end-to-end traceability using platforms like Metrc or BioTrackTHC. Every single plant is tagged with an encrypted RFID barcoded tag in the vegetative stage; when harvested, biomass is batched, weighed to the gram, tested by licensed laboratories, and tracked through manifest delivery to the retail dispensary point of sale.",
          },
          {
            heading: "14.2 Retail Store Ergonomics and Customer Experience",
            content: "Modern dispensaries have evolved from illicit-style security counters into sophisticated, open-concept educational environments reminiscent of premium consumer electronics or apothecary boutiques. Dividing retail flow between consultation zones for novice consumers and express pickup kiosks for experienced buyers optimizes throughput during peak foot traffic.",
          },
          {
            heading: "14.3 Wholesale Commoditization and Margin Compression",
            content: "As state markets mature and cultivation square footage expands, wholesale prices inevitably collapse—often dropping from $3,000 per pound of dry flower down to $600-$800 per pound within 36 months of market opening. Retail operators must insulate themselves by developing proprietary house brands, expanding high-margin derivative products (edibles, solventless extracts), and optimizing labor efficiency.",
          },
        ],
        caseStudy: {
          title: "Case Study: Point-of-Sale Integration and Inventory Accuracy",
          context: "A high-volume dispensary processing 1,200 transactions per day suffered from inventory discrepancies between physical shelf counts and state Metrc reporting, risking regulatory audit fines.",
          intervention: "Integrated automated barcode scanning at every POS terminal, instituted daily rolling cycle counts, and deployed live inventory synchronization with state compliance databases.",
          results: "Reduced inventory count discrepancies to 0.02%, completely eliminated compliance infraction notices, and decreased patient wait times from 14 minutes down to 3.5 minutes.",
        },
        takeaways: [
          "Real-time track-and-trace integration is non-negotiable for retail license maintenance.",
          "Wholesale price deflation requires operators to transition from commodity flower to branded, value-added products.",
          "Educated frontline retail staff significantly drive consumer loyalty and basket size.",
        ],
        discussionQuestions: [
          "How can independent dispensaries compete effectively against multi-state operators (MSOs) with massive capital reserves?",
          "What role does e-commerce pre-ordering and delivery play in modern cannabis retail market penetration?",
        ],
      },
      {
        number: 15,
        title: "Social Equity, Industrial Hemp & 20-Year Global Horizons",
        subtitle: "Restorative Justice, Carbon-Negative Biomaterials, and Global Normalization",
        epigraph: {
          quote: "The future of the plant lies not only in medicine and recreation, but in repairing the planet and our communities.",
          attribution: "Social Equity & Sustainability Leader",
        },
        abstract: "Synthesizes the broader future of the cannabis genus: social equity licensing and restorative justice, industrial hemp for carbon sequestration and bioplastics, global export markets, and the 20-year horizon of botanical science.",
        sections: [
          {
            heading: "15.1 Social Equity and Repairing War on Drugs Harms",
            content: "Decades of punitive drug policies disproportionately devastated Black, Latino, and lower-income communities through discriminatory arrest rates and mass incarceration. Modern legalization frameworks increasingly mandate social equity licensing programs, priority funding, expungement of non-violent criminal records, and tax-revenue reinvestment directly into disproportionately impacted communities.",
          },
          {
            heading: "15.2 Industrial Hemp: Biocomposites, Textiles, and Carbon Sequestration",
            content: "Beyond intoxicating cannabinoids, industrial Cannabis sativa (hemp) represents one of the most prolific bio-resource crops on Earth. Hemp bast fibers yield high-tensile textiles, biodegradable bioplastics, and carbon-negative building materials ('hempcrete'). Furthermore, hemp crops can sequester up to 15 tons of carbon dioxide per hectare, positioning the plant as a major tool for regenerative agriculture.",
          },
          {
            heading: "15.3 The 20-Year Global Strategic Trajectory",
            content: "Over the next two decades, cannabis will transition from a fragmented illicit commodity to a globally traded, standardized agricultural and pharmaceutical infrastructure. International treaties (such as the 1961 UN Single Convention) are undergoing reform; international medical trade from nations like Canada, Germany, Colombia, and Australia is expanding rapidly. The convergence of plant genomics, clinical research, and sustainable manufacturing will establish cannabis as an enduring foundation of 21st-century bio-economy.",
          },
        ],
        caseStudy: {
          title: "Case Study: Carbon-Negative Commercial Construction Using Hempcrete",
          context: "A commercial real estate development consortium sought to construct an eco-friendly manufacturing facility while minimizing embedded carbon emissions.",
          intervention: "Utilized regional industrial hemp hurds mixed with natural hydraulic lime to cast monolithic hempcrete exterior walls across a 25,000-square-foot structure.",
          results: "The project achieved net-negative embedded carbon metrics, reduced facility heating and cooling energy requirements by 40% due to hempcrete's high thermal mass, and demonstrated the industrial viability of agricultural hemp.",
        },
        takeaways: [
          "Legalization must be coupled with intentional social equity frameworks to repair historical community harms.",
          "Industrial hemp provides high-performance bio-materials and exceptional agricultural carbon sequestration.",
          "Global trade harmonization will transform cannabis into an essential international agricultural commodity.",
        ],
        discussionQuestions: [
          "What policy structures ensure that social equity license holders maintain ownership in the face of corporate consolidation?",
          "How can the industrial hemp sector overcome processing infrastructure deficits to compete with petroleum-based plastics?",
        ],
      },
    ];
  } else {
    // Universal 15-Chapter Framework for other topics (business, history, science, etc.)
    const titles = [
      { t: `Foundations and Historical Origins of ${t}`, s: "First Principles, Theoretical Lineage, and Core Axioms" },
      { t: `Core Taxonomic Frameworks and Terminology`, s: "Categorical Models, Demarcations, and Structural Definitions" },
      { t: `Empirical Mechanisms and Underlying Systems`, s: "Observable Dynamics, Functional Relationships, and Evidence" },
      { t: `Methodologies, Standards, and Best Practices`, s: "Standard Operating Procedures and Analytical Protocols" },
      { t: `Infrastructure, Systems, and Operational Design`, s: "Structuring Scalable Workflows and Resilient Architectures" },
      { t: `Tools, Technologies, and Applied Innovations`, s: "Modern Methodological Tools and Implementation Ecosystems" },
      { t: `Diagnostics, Analytics, and Performance Metrics`, s: "Observability, Key Performance Indicators, and Quality Assurance" },
      { t: `Risk Mitigation, Safety, and Security Architecture`, s: "Vulnerability Management, Defense-in-Depth, and Resilience" },
      { t: `Ethical Governance, Equity, and Social Responsibility`, s: "Institutional Stewardship, Transparency, and Public Trust" },
      { t: `Human Factors, Expertise, and Organizational Dynamics`, s: "Leadership Ergonomics, Collaboration, and Decision-Making" },
      { t: `Enterprise Scalability and Modernization Paradigms`, s: "Managing Organizational Growth and Modernizing Operations" },
      { t: `Economic Fundamentals, Value Creation, and Unit Economics`, s: "Capital Allocation, Fiscal Efficiency, and Sustainable Margins" },
      { t: `Regulatory Compliance, Legal Frameworks, and Auditing`, s: "Statutory Navigation, Compliance Mandates, and Accountability" },
      { t: `Global Perspectives and Socio-Cultural Impacts`, s: "Cross-Border Market Dynamics and Macroeconomic Trajectories" },
      { t: `Grand Synthesis, Future Horizons, and 20-Year Strategic Roadmap`, s: "Emerging Innovations and the Long-Term Evolutionary Path" },
    ];

    rawChapters = titles.map((item, idx) => ({
      number: idx + 1,
      title: item.t,
      subtitle: item.s,
      epigraph: {
        quote: "True mastery begins where conventional paradigms reach their definitive boundary.",
        attribution: "Scholarly Inquiry Axiom",
      },
      abstract: `An authoritative analysis of ${item.t.toLowerCase()}, examining foundational theory, empirical evidence, and operational applications within ${t}.`,
      sections: [
        {
          heading: `${idx + 1}.1 Core Principles and Theoretical Baseline`,
          content: `To ground modern inquiry into ${item.t.toLowerCase()}, researchers and practitioners must first establish a rigorous conceptual baseline. Historical evidence demonstrates that lasting progress in ${t} depends upon uniting foundational theory with disciplined, repeatable operational methodologies.`,
        },
        {
          heading: `${idx + 1}.2 Empirical Observations and Systemic Dynamics`,
          content: `Investigating the empirical dynamics of ${item.t.toLowerCase()} reveals critical dependencies that govern performance across diverse operating environments. Continuous observation, transparent data recording, and rigorous quality control protocols are essential for maintaining stability and mitigating systemic drift.`,
        },
        {
          heading: `${idx + 1}.3 Practical Implementation and Practitioner Insights`,
          content: `Translating theory into effective practice requires navigating organizational, economic, and operational constraints. Leading practitioners address these challenges by establishing clear standard operating procedures, fostering cross-functional alignment, and prioritizing long-term value creation.`,
        },
      ],
      caseStudy: {
        title: `Case Study: Strategic Implementation of ${item.t}`,
        context: `An organization operating in a competitive environment faced operational inconsistencies and rising customer fulfillment overhead due to fragmented processes and lack of documented standards.`,
        intervention: `Leadership deployed a comprehensive operational overhaul grounded in rigorous standard operating procedures, employee training programs, and transparent performance metrics tied directly to quality benchmarks.`,
        results: `Following a six-month rollout, operational variance decreased by 74%, overall customer satisfaction scores rose to 96%, and resource efficiency improved by 22%, demonstrating the value of systematic, disciplined execution.`,
      },
      takeaways: [
        `Methodological rigor and clear operational standards are essential for sustainable success in ${t}.`,
        "Continuous performance measurement and data-driven feedback loops prevent organizational drift.",
        "Balancing strategic innovation with disciplined quality assurance ensures long-term stakeholder trust.",
      ],
      discussionQuestions: [
        `What are the most significant obstacles preventing organizations from successfully implementing modern best practices in ${t}?`,
        "How can leadership foster a culture of rigorous continuous improvement without overburdening frontline practitioners?",
      ],
    }));
  }

  // Ensure every single chapter contains 2,000+ words of real, domain-relevant prose
  return rawChapters.map((ch) => ensureChapterWordCount(ch, cleanTopic, authorName, 2000));
}
