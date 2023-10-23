// import React, { FunctionComponent } from 'react';
// import { ApolloProvider } from '@apollo/client';
// import { MockedProvider } from '@apollo/client/testing';

// import { GET_CHARACTERS } from '../../apollo/people';
// import client from '../../apollo/client';

// import Chart from './Chart';

// const ChartStory = {
//   title: 'Chart',
//   component: Chart,
//   decorators: [
//     (Story: FunctionComponent) => (
//       <MockedProvider
//         mocks={[
//           {
//             request: {
//               query: GET_CHARACTERS
//             },
//             result: {
//               data: {
//                 characters: {
//                   results: [
//                     {
//                       name: 'Character 1',
//                       created: '2017-01-01T00:00:00.000Z',
//                       gender: 'Male'
//                     }
//                   ]
//                 }
//               }
//             }
//           }
//         ]}
//       >
//         <Story />
//       </MockedProvider>
//     )
//   ]
// };

// export default ChartStory;

// export const Default = () => (
//   <ApolloProvider client={client}>
//     <Chart />
//   </ApolloProvider>
// );
