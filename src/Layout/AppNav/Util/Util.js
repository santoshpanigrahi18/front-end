export const sideMenuDataSet= (reportAccess,name) => {
  let inventoryData= reportAccess
  // .filter(obj =>
  //      obj.module == name
  //    )
     .map((filteredObj)=>{
       return{
         icon: "lnr-chart-bars",
         label: filteredObj.analysis,
         [ filteredObj.page==''?'to':"content"]:filteredObj.page==''?`#/returnReport/${filteredObj.analysis.toLowerCase().replaceAll(/\s/g,'')}`:
           {
             label: filteredObj.page,
             to: "#/dashboard",
           },
         
       }
     })
     const res = Object.values(inventoryData.reduce((a, { label,icon, content,to }) => {
       if(content){
          a[label] = a[label] || { label,icon, content: new Set() };
         a[label].content.add(content);
      return a;
       }if(to){
          a[label]={ label,icon, to }
          return a;
       }
     }, {})).map(({ label, icon,content,to }) => (content?{ label,icon,
       content:[...content]
     }:{ label,icon,to}));

   return res;
};