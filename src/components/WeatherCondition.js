export const ConditionItem = ({ value, icon }) => {
  return (
    <div>
      <i className={icon}></i>
      <span>{value}</span>
    </div>
  );
};

export const ConditionList = ({ current }) => {
  const defaults = {
    // sunset: 'far fa-sunset fa-fw',
    // sunrise: 'far fa-sunrise fa-fw',
    humidity: 'fas fa-tint fa-fw',
    wind_speed: 'fas fa-wind fa-fw',
    // dew_point: 'fas fa-dewpoint',
    // visibility: 'far fa-eye fa-fw',
  };
  const keys = Object.keys(defaults);
  return (
    <div className='flex-grow-1'>
      {keys.map((key, index) => {
        return (
          <ConditionItem
            key={index}
            value={current && current[key]}
            icon={defaults[key]}
          />
        );
      })}
    </div>
  );
};

// const ConditionList = ({ current }) => {
//   const conds = {
//     sunset: 'far fa-sunset fa-fw',
//     sunrise: 'far fa-sunrise fa-fw',
//     humidity: 'fas fa-tint fa-fw',
//     wind_speed: 'fas fa-wind fa-fw',
//     dew_point: 'fal fa-dewpoint fa-fw',
//     visibility: 'far fa-eye fa-fw',
//   };
//   const intersectKeys = (...objects) => {
//     return objects
//       .map((object) => Object.keys(object))
//       .sort((a, b) => a.length - b.length)
//       .reduce((a, b) => a.filter((key) => b.includes(key)));
//   };
//   const conditions = current
//     ? intersectKeys(current, conds).reduce((obj, key) => {
//         return {
//           ...obj,
//           [key]: { data: current[key], iconClass: conds[key] },
//         };
//       }, {})
//     : null;
//   return (
//     <div>
//       {conditions &&
//         Object.keys(conditions).map((condition, index) => {
//           return (
//             <ConditionItem
//               key={index}
//               data={conditions[condition].data}
//               iconClass={conditions[condition].iconClass}
//             />
//           );
//         })}
//     </div>
//   );
// };
