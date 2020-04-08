const icon = `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
<path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
</svg>`;

// захардкоженные данные в виде массива ключ значение
export const creatSorting = [{
  name: `event`,
  icon: ``,
  check: `true`
},
{
  name: `time`,
  icon,
  check: 0
},
{
  name: `price`,
  icon,
  check: 0
}
];
