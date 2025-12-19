 studentId = document.getElementById("studentId");
term = document.getElementById("Sterm");
Sclass = document.getElementById("Sclass");
let getDetails = document.getElementById("getDetails");


  function showLoading() {
                getDetails.innerHTML = '<span style="display: inline-flex; align-items: center; gap: 0.5rem;">Loading <div style="width: 12px; height: 12px; border: 2px solid #fff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div></span>';
                getDetails.disabled = true;
                console.log("loading")
        }

  function hideLoading() {
                getDetails.innerHTML = 'Get Details';
                getDetails.disabled = false;
                console.log("loading")
        }

        
        
getDetails.onclick = async (e) => {
  e.preventDefault();
  showLoading()
  let studentIdNum = studentId.value;
  let schoolTerm = term.value;
  let studentclass = Sclass.value;

  if (studentIdNum != "" && schoolTerm != "" && studentclass != "") {
    try {
      
      const result = await fetch(
        `/student-result?studentId=${studentIdNum}&&term=${schoolTerm}&&sClass=${studentclass}`
      );
      if (result.ok) {
        const data = await result.json();
        console.log("data" + data)
        let currentClass = studentclass.split(" ");
        console.log(currentClass[0]);
        if (currentClass[0] == "BASIC") {
          basicStudentResultTemplate(data);
        } else if (currentClass[0] == "JSS") {
          juniorStudentResultTemplate(data);
        } else if (currentClass[0] == "SS") {
          seniorStudentResultTemplate(data);
        } else {
          nurseryStudentResultTemplate(data);
        }
      } else {
        alert("result not found");
      }
    } catch (err) {
      console.log(err);
    }finally{
        hideLoading();
    }
  } else {
    alert("student Id, Class and Term most be filled");
  }
};
//BASIC EDUCATION
function basicStudentResultTemplate(data) {
  //English
  document.getElementById("eng").value = data.eng;
  document.getElementById("eng1st").value = data.eng1st;
  document.getElementById("eng2nd").value = data.eng2nd;
  document.getElementById("engca").value = data.engca;
  document.getElementById("engexam").value = data.engexam;
  document.getElementById("engscore").value = data.engscore
  document.getElementById("engG").value = data.engG
  document.getElementById("engRemark").value = data.engRemark
  //mathes
 document.getElementById("mth").value = data.mth;
  document.getElementById("mth1st").value = data.mth1st;
  document.getElementById("mth2nd").value = data.mth2nd;
  document.getElementById("mthca").value = data.mthca;
  document.getElementById("mthexam").value = data.mthexam;
  document.getElementById("mthscore").value = data.mthscore
  document.getElementById("mthG").value = data.mthG
  document.getElementById("mthRemark").value = data.mthRemark
  //CRS
  document.getElementById("rnv").value = data.rnv;
  document.getElementById("rnv1st").value = data.rnv1st;
  document.getElementById("rnv2nd").value = data.rnv2nd;
  document.getElementById("rnvca").value = data.rnvca;
  document.getElementById("rnvexam").value = data.rnvexam;
  document.getElementById("rnvscore").value = data.rnvscore
  document.getElementById("rnvG").value = data.rnvG
  document.getElementById("rnvRemark").value = data.rnvRemark
  //Basic science
  document.getElementById("bst").value = data.bst;
  document.getElementById("bst1st").value = data.bst1st;
  document.getElementById("bst2nd").value = data.bst2nd;
  document.getElementById("bstca").value = data.bstca;
  document.getElementById("bstexam").value = data.bstexam;
  document.getElementById("bstscore").value = data.bstscore
  document.getElementById("bstG").value = data.bstG
  document.getElementById("bstRemark").value = data.bstRemark
  //Edo language
  document.getElementById("pvs").value = data.pvs;
  document.getElementById("pvs1st").value = data.pvs1st;
  document.getElementById("pvs2nd").value = data.pvs2nd;
  document.getElementById("pvsca").value = data.pvsca;
  document.getElementById("pvsexam").value = data.pvsexam;
  document.getElementById("pvsscore").value = data.pvsscore
  document.getElementById("pvsG").value = data.pvsG
  document.getElementById("pvsRemark").value = data.pvsRemark
  //quantitative reasoning
  document.getElementById("qur").value = data.qur;
  document.getElementById("qur1st").value = data.qur1st;
  document.getElementById("qur2nd").value = data.qur2nd;
  document.getElementById("qurca").value = data.qurca;
  document.getElementById("qurexam").value = data.qurexam;
  document.getElementById("qurscore").value = data.qurscore
  document.getElementById("qurG").value = data.qurG
  document.getElementById("qurRemark").value = data.qurRemark
  //virber atitude
  
  document.getElementById("ver").value = data.ver;
  document.getElementById("ver1st").value = data.ver1st;
  document.getElementById("ver2nd").value = data.ver2nd;
  document.getElementById("verca").value = data.verca;
  document.getElementById("verexam").value = data.verexam;
  document.getElementById("verscore").value = data.verscore
  document.getElementById("verG").value = data.verG
  document.getElementById("verRemark").value = data.verRemark
 
  //Numerical Aptitude
  document.getElementById("vst").value = data.vst;
  document.getElementById("vst1st").value = data.vst1st;
  document.getElementById("vst2nd").value = data.vst2nd;
  document.getElementById("vstca").value = data.vstca;
  document.getElementById("vstexam").value = data.vstexam;
  document.getElementById("vstscore").value = data.vstscore
  document.getElementById("vstG").value = data.vstG
  document.getElementById("vstRemark").value = data.vstRemark
  //culture creative art
  document.getElementById("cra").value =  data.cra;
  document.getElementById("cra1st").value = data.cra1st;
  document.getElementById("cra2nd").value = data.cra2nd;
  document.getElementById("craca").value = data.craca;
  document.getElementById("craexam").value = data.craexam;
   document.getElementById("crascore").value = data.crascore
  document.getElementById("craG").value = data.craG
  document.getElementById("craRemark").value = data.craRemark
  //natianl value
  document.getElementById("spe").value = data.spe;
  document.getElementById("spe1st").value = data.spe1st;
  document.getElementById("spe2nd").value = data.spe2nd;
  document.getElementById("speca").value = data.speca;
  document.getElementById("speexam").value = data.speexam;
  document.getElementById("spescore").value = data.spescore
  document.getElementById("speG").value = data.speG
  document.getElementById("speRemark").value = data.speRemark

  document.getElementById("hwr").value = data.hwr;
  document.getElementById("hwr1st").value = data.hwr1st;
  document.getElementById("hwr2nd").value = data.hwr2nd;
  document.getElementById("hwrca").value = data.hwrca;
  document.getElementById("hwrexam").value = data.hwrexam;
  document.getElementById("hwrscore").value = data.hwrscore
  document.getElementById("hwrG").value = data.hwrG
  document.getElementById("hwrRemark").value = data.hwrRemark
  //history
  document.getElementById("hst").value = data.hst;
  document.getElementById("hst1st").value = data.hst1st;
  document.getElementById("hst2nd").value = data.hst2nd;
  document.getElementById("hstca").value = data.hstca;
  document.getElementById("hstexam").value = data.hstexam;
  document.getElementById("hstscore").value = data.hstscore
  document.getElementById("hstG").value = data.hstG
  document.getElementById("hstRemark").value = data.hstRemark
  //prevocational study
  document.getElementById("pvd").value = data.pvd;
  document.getElementById("pvd1st").value = data.pvd1st;
  document.getElementById("pvd2nd").value = data.pvd2nd;
  document.getElementById("pvdca").value = data.pvdca;
  document.getElementById("pvdexam").value = data.pvdexam;
  document.getElementById("pvdscore").value = data.pvdscore
  document.getElementById("pvdG").value = data.pvdG
  document.getElementById("pvdRemark").value = data.pvdRemark
  //phonics
  
  document.getElementById("mus").value = data.mus;
  document.getElementById("mus1st").value = data.mus1st;
  document.getElementById("mus2nd").value = data.mus2nd;
  document.getElementById("musca").value = data.musca;
  document.getElementById("musexam").value = data.musexam;
  document.getElementById("musscore").value = data.musscore
  document.getElementById("musG").value = data.musG
  document.getElementById("musRemark").value = data.musRemark
 
  //french
  document.getElementById("red").value = data.red;
  document.getElementById("red1st").value = data.red1st;
  document.getElementById("red2nd").value = data.red2nd;
  document.getElementById("redca").value = data.redca;
  document.getElementById("redexam").value = data.redexam;
  document.getElementById("redscore").value = data.redscore
  document.getElementById("redG").value = data.redG
  document.getElementById("redRemark").value = data.redRemark

  //other infomation
  otherInfo(data);
}
//JUNIOR SECONDARY SCHOOOL
function juniorStudentResultTemplate(data) {
  document.getElementById("eng").value = data.eng;
  document.getElementById("eng1st").value = data.eng1st;
  document.getElementById("eng2nd").value = data.eng2nd;
  document.getElementById("engca").value = data.engca;
  document.getElementById("engexam").value = data.engexam;
   document.getElementById("engscore").value = data.engscore
  document.getElementById("engG").value = data.engG
  document.getElementById("engRemark").value = data.engRemark
  //mathes
  document.getElementById("mth").value = data.mth;
  document.getElementById("mth1st").value = data.mth1st;
  document.getElementById("mth2nd").value = data.mth2nd;
  document.getElementById("mthca").value = data.mthca;
  document.getElementById("mthexam").value = data.mthexam;
   document.getElementById("mthscore").value = data.mthscore
   document.getElementById("mthG").value = data.mthG
  document.getElementById("mthRemark").value = data.mthRemark
  //BASIC SCIENCE
  document.getElementById("bsc").value =  data.bsc;
  document.getElementById("bsc1st").value = data.bsc1st;
  document.getElementById("bsc2nd").value = data.bsc2nd;
  document.getElementById("bscca").value = data.bscca;
  document.getElementById("bscexam").value = data.bscexam;
   document.getElementById("bscscore").value = data.bscscore
   document.getElementById("bscG").value = data.bscG
  document.getElementById("bscRemark").value = data.bscRemark

  //HISTORY
  document.getElementById("btc").value = data.btc;
  document.getElementById("btc1st").value = data.btc1st;
  document.getElementById("btc2nd").value = data.btc2nd;
  document.getElementById("btcca").value = data.btcca;
  document.getElementById("btcexam").value = data.btcexam;
   document.getElementById("btcscore").value = data.btcscore
   document.getElementById("btcG").value = data.btcG
  document.getElementById("btcRemark").value = data.btcRemark
  //SPECCH SCIENCE
  document.getElementById("bst").value = data.bst;
  document.getElementById("bst1st").value = data.bst1st;
  document.getElementById("bst2nd").value = data.bst2nd;
  document.getElementById("bstca").value = data.bstca;
  document.getElementById("bstexam").value = data.bstexam;
   document.getElementById("bstscore").value = data.bstscore
   document.getElementById("bstG").value = data.bstG
  document.getElementById("bstRemark").value = data.bstRemark
  //FRENCH
  document.getElementById("fre").value = data.fre;
  document.getElementById("fre1st").value = data.fre1st;
  document.getElementById("fre2nd").value = data.fre2nd;
  document.getElementById("freca").value = data.freca;
  document.getElementById("freexam").value = data.freexam;
   document.getElementById("frescore").value = data.frescore
   document.getElementById("freG").value = data.freG
  document.getElementById("freRemark").value = data.freRemark
  //NANTIONAL VALUES
  document.getElementById("agr").value = data.agr;
  document.getElementById("agr1st").value = data.agr1st;
  document.getElementById("agr2nd").value = data.agr2nd;
  document.getElementById("agrca").value = data.agrca;
  document.getElementById("agrexam").value = data.agrexam;
  document.getElementById("agrscore").value = data.agrscore
  document.getElementById("agrG").value = data.agrG
  document.getElementById("agrRemark").value = data.agrRemark
  //CRS
  document.getElementById("crs").value = data.crs;
  document.getElementById("crs1st").value = data.crs1st;
  document.getElementById("crs2nd").value = data.crs2nd;
  document.getElementById("crsca").value = data.crsca;
  document.getElementById("crsexam").value = data.crsexam;
   document.getElementById("crsscore").value = data.crsscore
   document.getElementById("crsG").value = data.crsG
  document.getElementById("crsRemark").value = data.crsRemark
  //EDO
  document.getElementById("hiy").value = data.hiy;
  document.getElementById("hiy1st").value = data.hiy1st;
  document.getElementById("hiy2nd").value = data.hiy2nd;
  document.getElementById("hiyca").value = data.hiyca;
  document.getElementById("hiyexam").value = data.hiyexam;
  document.getElementById("hiyscore").value = data.hiyscore;
  document.getElementById("hiyscore").value = data.hiyscore
  document.getElementById("hiyG").value = data.hiyG
  document.getElementById("hiyRemark").value = data.hiyRemark
  //CULTURAL AND CREATIVE ART
  document.getElementById("cra").value = data.cra;
  document.getElementById("cra1st").value = data.cra1st;
  document.getElementById("cra2nd").value = data.cra2nd;
  document.getElementById("craca").value = data.craca;
  document.getElementById("craexam").value = data.craexam;
  document.getElementById("crascore").value = data.crascore
  document.getElementById("craG").value = data.craG
  document.getElementById("craRemark").value = data.craRemark
  //PREVOCATIONAL STUDY
  document.getElementById("csc").value = data.csc;
  document.getElementById("csc1st").value = data.csc1st;
  document.getElementById("csc2nd").value = data.csc2nd;
  document.getElementById("cscca").value = data.cscca;
  document.getElementById("cscexam").value = data.cscexam;
  document.getElementById("cscscore").value = data.cscscore
  document.getElementById("cscG").value = data.cscG
  document.getElementById("cscRemark").value = data.cscRemark
  
  //HOME ECONOMICS
  document.getElementById("hec").value = data.hec;
  document.getElementById("hec1st").value = data.hec1st;
  document.getElementById("hec2nd").value = data.hec2nd;
  document.getElementById("hecca").value = data.hecca;
  document.getElementById("hecexam").value = data.hecexam;
  document.getElementById("hecscore").value = data.hecscore
  document.getElementById("hecG").value = data.hecG
  document.getElementById("hecRemark").value = data.hecRemark
  
  //CIVIC EDUCATION
  document.getElementById("ced").value = data.ced;
  document.getElementById("ced1st").value = data.ced1st;
  document.getElementById("ced2nd").value = data.ced2nd;
  document.getElementById("cedca").value = data.cedca;
  document.getElementById("cedexam").value = data.cedexam;
  document.getElementById("cedscore").value = data.cedscore
  document.getElementById("cedG").value = data.cedG
  document.getElementById("cedRemark").value = data.cedRemark

   //CCA having art id
   document.getElementById("art").value = data.art;
   document.getElementById("art1st").value = data.art1st;
   document.getElementById("art2nd").value = data.art2nd;
   document.getElementById("artca").value = data.artca;
   document.getElementById("artexam").value = data.artexam;
   document.getElementById("artscore").value = data.artscore
   document.getElementById("artG").value = data.artG
   document.getElementById("artRemark").value = data.artRemark
  otherInfo(data);
}

//NURSERY
function nurseryStudentResultTemplate(data) {
  //English
  document.getElementById("eng").value = "Letter Work" //data.eng;
  document.getElementById("eng1st").value = data.eng1st;
  document.getElementById("eng2nd").value = data.eng2nd;
  document.getElementById("engca").value = data.engca;
  document.getElementById("engexam").value = data.engexam;
  document.getElementById("engscore").value = data.engscore
  document.getElementById("engG").value = data.engG
  document.getElementById("engRemark").value = data.engRemark
  //mathes
  document.getElementById("mth").value = "Number Work" //data.mth;
  document.getElementById("mth1st").value = data.mth1st;
  document.getElementById("mth2nd").value = data.mth2nd;
  document.getElementById("mthca").value = data.mthca;
  document.getElementById("mthexam").value = data.mthexam;
   document.getElementById("mthscore").value = data.mthscore
  document.getElementById("mthG").value = data.mthG
  document.getElementById("mthRemark").value = data.mthRemark
  
  //CRS
  document.getElementById("rnv").value ='Quantitative Reasoning' // data.rnv;
  document.getElementById("rnv1st").value = data.rnv1st;
  document.getElementById("rnv2nd").value = data.rnv2nd;
  document.getElementById("rnvca").value = data.rnvca;
  document.getElementById("rnvexam").value = data.rnvexam;
   document.getElementById("rnvscore").value = data.rnvscore
  document.getElementById("rnvG").value = data.rnvG
  document.getElementById("rnvRemark").value = data.rnvRemark
  
  //Basic science
  document.getElementById("bst").value = 'Basic Science' //data.bst;
  document.getElementById("bst1st").value = data.bst1st;
  document.getElementById("bst2nd").value = data.bst2nd;
  document.getElementById("bstca").value = data.bstca;
  document.getElementById("bstexam").value = data.bstexam;
   document.getElementById("bstscore").value = data.bstscore
  document.getElementById("bstG").value = data.bstG
  document.getElementById("bstRemark").value = data.bstRemark
  //Edo language
  document.getElementById("pvs").value = 'Social Habit'// data.pvs;
  document.getElementById("pvs1st").value = data.pvs1st;
  document.getElementById("pvs2nd").value = data.pvs2nd;
  document.getElementById("pvsca").value = data.pvsca;
  document.getElementById("pvsexam").value = data.pvsexam;
   document.getElementById("pvsscore").value = data.pvsscore
   document.getElementById("pvsG").value = data.pvsG
  document.getElementById("pvsRemark").value = data.pvsRemark
 
  //quantitative reasoning
  document.getElementById("qur").value = 'Poems'//data.qur;
  document.getElementById("qur1st").value = data.qur1st;
  document.getElementById("qur2nd").value = data.qur2nd;
  document.getElementById("qurca").value = data.qurca;
  document.getElementById("qurexam").value = data.qurexam;
   document.getElementById("qurscore").value = data.qurscore
   document.getElementById("qurG").value = data.qurG
  document.getElementById("qurRemark").value = data.qurRemark

  //virber atitude
  //document.getElementById("ver").value = data.ver;
  document.getElementById("ver1st").value = data.ver1st;
  document.getElementById("ver2nd").value = data.ver2nd;
  document.getElementById("verca").value = data.verca;
  document.getElementById("verexam").value = data.verexam;
   document.getElementById("verscore").value = data.verscore
   document.getElementById("verG").value = data.verG
  document.getElementById("verRemark").value = data.verRemark
  //Numerical Aptitude
  document.getElementById("vst").value = 'Writing'//data.vst;
  document.getElementById("vst1st").value = data.vst1st;
  document.getElementById("vst2nd").value = data.vst2nd;
  document.getElementById("vstca").value = data.vstca;
  document.getElementById("vstexam").value = data.vstexam;
   document.getElementById("vstscore").value = data.vstscore
   document.getElementById("vstG").value = data.vstG
  document.getElementById("vstRemark").value = data.vstRemark
  //culture creative art

  //document.getElementById("cra").value = data.cra;
  document.getElementById("cra1st").value = data.cra1st;
  document.getElementById("cra2nd").value = data.cra2nd;
  document.getElementById("craca").value = data.craca;
  document.getElementById("craexam").value = data.craexam;
   document.getElementById("crascore").value = data.crascore
   document.getElementById("craG").value = data.craG
  document.getElementById("craRemark").value = data.craRemark

  //SPEACH SCIENCE
  //document.getElementById("ver").value = data.ver;
  document.getElementById("ver1st").value = data.ver1st;
  document.getElementById("ver2nd").value = data.ver2nd;
  document.getElementById("verca").value = data.verca;
  document.getElementById("verexam").value = data.verexam;
   document.getElementById("verscore").value = data.verscore
   document.getElementById("verG").value = data.verG
  document.getElementById("verRemark").value = data.verRemark
  //Practical Life
  document.getElementById("plf").value = 'Health Habit'// data.plf;
  document.getElementById("plf1st").value = data.plf1st;
  document.getElementById("plf2nd").value = data.plf2nd;
  document.getElementById("plfca").value = data.plfca;
  document.getElementById("plfexam").value = data.plfexam;
  document.getElementById("plfscore").value = data.plfscore
  document.getElementById("plfG").value = data.plfG
  document.getElementById("plfRemark").value = data.plfRemark
  //Verbal Reasoning
  //document.getElementById("vrn").value = data.vrn;
  document.getElementById("vrn1st").value = data.vrn1st;
  document.getElementById("vrn2nd").value = data.vrn2nd;
  document.getElementById("vrnca").value = data.vrnca;
  document.getElementById("vrnexam").value = data.vrnexam;
   document.getElementById("vrnscore").value = data.vrnscore
   document.getElementById("vrnG").value = data.vrnG
  document.getElementById("vrnRemark").value = data.vrnRemark
  
  
  //Verbal Reasoning
  document.getElementById("crs").value =  'Phonics'//data.crs;
  document.getElementById("crs1st").value = data.crs1st;
  document.getElementById("crs2nd").value = data.crs2nd;
  document.getElementById("crsca").value = data.crsca;
  document.getElementById("crsexam").value = data.crsexam;
   document.getElementById("crsscore").value = data.crsscore
   document.getElementById("crsG").value = data.crsG
  document.getElementById("crsRemark").value = data.crsRemark
  //other infomation
  otherInfo(data);
}
//SENIOR RESULT
function seniorStudentResultTemplate(data) {
  //English
  document.getElementById("eng").value = data.eng;
  document.getElementById("eng1st").value = data.eng1st;
  document.getElementById("eng2nd").value = data.eng2nd;
  document.getElementById("engcca").value = data.engcca;
  document.getElementById("engexam").value = data.engexam;
  document.getElementById("enG").value = data.engG
  document.getElementById("engRemark").value = data.engRemark
  //mathes
  document.getElementById("mth").value = data.mth;
  document.getElementById("mth1st").value = data.mth1st;
  document.getElementById("mth2nd").value = data.mth2nd;
  document.getElementById("mthcca").value = data.mthcca;
  document.getElementById("mthexam").value = data.mthexam;
   document.getElementById("mthG").value = data.mthG
  document.getElementById("mthRemark").value = data.mthRemark
  //CRS
  document.getElementById("crs").value = data.crs;
  document.getElementById("crs1st").value = data.crs1st;
  document.getElementById("crs2nd").value = data.crs2nd;
  document.getElementById("crscca").value = data.crscca;
  document.getElementById("crsexam").value = data.crsexam;
   document.getElementById("crsG").value = data.crsG
  document.getElementById("crsRemark").value = data.crsRemark
  //BIOLOGY
  document.getElementById("bio").value = data.bio;
  document.getElementById("bio1st").value = data.bio1st;
  document.getElementById("bio2nd").value = data.bio2nd;
  document.getElementById("biocca").value = data.biocca;
  document.getElementById("bioexam").value = data.bioexam;
   document.getElementById("bioG").value = data.bioG
  document.getElementById("bioRemark").value = data.bioRemark
  //GOVERNMENT
  document.getElementById("gov").value = data.gov;
  document.getElementById("gov1st").value = data.gov1st;
  document.getElementById("gov2nd").value = data.gov2nd;
  document.getElementById("govcca").value = data.govcca;
  document.getElementById("govexam").value = data.govexam;
  document.getElementById("govG").value = data.govG
  document.getElementById("govRemark").value = data.govRemark
  //ECONOMICS
  document.getElementById("eco").value = data.eco;
  document.getElementById("eco1st").value = data.eco1st;
  document.getElementById("eco2nd").value = data.eco2nd;
  document.getElementById("ecocca").value = data.ecocca;
  document.getElementById("ecoexam").value = data.ecoexam;
   document.getElementById("ecoG").value = data.ecoG
  document.getElementById("ecoRemark").value = data.ecoRemark
  //LITERATURE
  document.getElementById("lit").value = data.lit;
  document.getElementById("lit1st").value = data.lit1st;
  document.getElementById("lit2nd").value = data.lit2nd;
  document.getElementById("litcca").value = data.litcca;
  document.getElementById("litexam").value = data.litexam;
  document.getElementById("litG").value = data.litG
  document.getElementById("litRemark").value = data.litRemark
  //CIVIC EDCUCATION
  document.getElementById("civ").value = data.civ;
  document.getElementById("civ1st").value = data.civ1st;
  document.getElementById("civ2nd").value = data.civ2nd;
  document.getElementById("civcca").value = data.civcca;
  document.getElementById("civexam").value = data.civexam;
   document.getElementById("civG").value = data.civG
  document.getElementById("civRemark").value = data.civRemark
  //CHEMISTRY
  document.getElementById("che").value = data.che;
  document.getElementById("che1st").value = data.che1st;
  document.getElementById("che2nd").value = data.che2nd;
  document.getElementById("checca").value = data.checca;
  document.getElementById("cheexam").value = data.cheexam;
   document.getElementById("cheG").value = data.cheG
  document.getElementById("cheRemark").value = data.cheRemark
  //AGRICUTURE
  document.getElementById("agr").value = data.agr;
  document.getElementById("agr1st").value = data.agr1st;
  document.getElementById("agr2nd").value = data.agr2nd;
  document.getElementById("agrcca").value = data.agrcca;
  document.getElementById("agrexam").value = data.agrexam;
   document.getElementById("agrG").value = data.agrG
  document.getElementById("agrRemark").value = data.agrRemark
  //Geography
  document.getElementById("geo").value = data.geo;
  document.getElementById("geo1st").value = data.geo1st;
  document.getElementById("geo2nd").value = data.geo2nd;
  document.getElementById("geocca").value = data.geocca;
  document.getElementById("geoexam").value = data.geoexam;
   document.getElementById("geoG").value = data.geoG
  document.getElementById("geoRemark").value = data.geoRemark
  //Physics
  document.getElementById("phy").value = data.phy;
  document.getElementById("phy1st").value = data.phy1st;
  document.getElementById("phy2nd").value = data.phy2nd;
  document.getElementById("phycca").value = data.phycca;
  document.getElementById("phyexam").value = data.phyexam;
   document.getElementById("phyG").value = data.phyG
  document.getElementById("phyRemark").value = data.phyRemark
  //Commerce
  document.getElementById("com").value = data.com;
  document.getElementById("com1st").value = data.com1st;
  document.getElementById("com2nd").value = data.com2nd;
  document.getElementById("comcca").value = data.comcca;
  document.getElementById("comexam").value = data.comexam;
  //Marketing
  document.getElementById("mkt").value = data.mkt;
  document.getElementById("mkt1st").value = data.mkt1st;
  document.getElementById("mkt2nd").value = data.mkt2nd;
  document.getElementById("mktcca").value = data.mktcca;
  document.getElementById("mktexam").value = data.mktexam;
   document.getElementById("mktG").value = data.mktG
  document.getElementById("mktRemark").value = data.mktRemark
  
  //Accounting
  document.getElementById("acc").value = data.acc;
  document.getElementById("acc1st").value = data.acc1st;
  document.getElementById("acc2nd").value = data.acc2nd;
  document.getElementById("acccca").value = data.acccca;
  document.getElementById("accexam").value = data.accexam;
   document.getElementById("accG").value = data.accG
  document.getElementById("accRemark").value = data.accRemark
  // //Visual Art
  // document.getElementById("vat").value = data.vat;
  // document.getElementById("vat1st").value = data.vat1st;
  // document.getElementById("vat2nd").value = data.vat2nd;
  // document.getElementById("vatcca").value = data.vatcca;
  // document.getElementById("vatexam").value = data.vatexam;
  // //Further Mathematics
  // document.getElementById("fmt").value = data.fmt;
  // document.getElementById("fmt1st").value = data.fmt1st;
  // document.getElementById("fmt2nd").value = data.fmt2nd;
  // document.getElementById("fmtcca").value = data.fmtcca;
  // document.getElementById("fmtexam").value = data.fmtexam;
  // //Computer Studies
  // document.getElementById("cst").value = data.cst;
  // document.getElementById("cst1st").value = data.cst1st;
  // document.getElementById("cst2nd").value = data.cst2nd;
  // document.getElementById("cstcca").value = data.cstcca;
  // document.getElementById("cstexam").value = data.cstexam;
  otherInfo(data)
}
//other infomation
function otherInfo(data) {
  document.getElementById("userName").value = data.userName;
  document.getElementById("section").value = data.section;
  document.getElementById("absent").value = data.absent;
  document.getElementById("present").value = data.present;
  document.getElementById("tReport").value = data.tReport;
  document.getElementById("promotedto").value = data.promote;
  document.getElementById("fees").value = data.fees;
  document.getElementById("nextterm").value = data.nextterm;
}
// Helper: Show loading on button
function showLoading() {
    getDetails.innerHTML = '<span style="display: inline-flex; align-items: center; gap: 0.5rem;">Loading <div style="width: 12px; height: 12px; border: 2px solid #fff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div></span>';
    getDetails.disabled = true;
}

// Helper: Hide loading
function hideLoading() {
    getDetails.innerHTML = 'Get Details';
    getDetails.disabled = false;
}