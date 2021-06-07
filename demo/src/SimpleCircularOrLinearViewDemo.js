import React from 'react';
import { SimpleCircularOrLinearView } from '../../src';

const SimpleCircularOrLinearViewDemo = () => (
  <div>
    <br />
    <br />
    <br />
    <br />

    <SimpleCircularOrLinearView
      annotationVisibility={{
        features: true,
        parts: true,
        cutsites: true,
        primers: true
      }}
      sequenceData={{
        sequence:
          'TTGTACACTTTTTTGTTGATATGTCATTCTTGTTGATTACATGGTGATGTTAATGGGCACAAATTTTCTGTCAGTGGAGAGGGTGAAGGTGATGCAACATACGGAAAACTTACCCTTAAATTTATTTGCACTACTGGAAAACTACCTGTTCCATGGCCAACACTTGTCACTACTTTCTCTTATGGTGTTCAATGCTTTTCCCGTTATCCGGATCATATGAAACGGCATGACTTTTTCAAGAGTGCCATGCCCGAAGGTTATGTACAGGAACGCACTATATCTTTCAAAGATGACGGGAACTACAAGACGCGTGCTGAAGTCAAGTTTGAAGGTGATACCCTTGTTAATCGTATCGAGTTAAAAGGTATTGATTTTAAAGAAGATGGAAACATTCTCGGACACAAACTCGAATACAACTATAACTCACACAATGTATACATCACGGCAGACAAACAAAAGAATGGAATCAAAGCTAACTTCAAAATTCGCCACAACATTGAAGATGGATCTGTTCAACTAGCAGACCATTATCAACAAAATACTCCAATTGGCGATGGCCCTGTCCTTTTACCAGACAACCATTACCTGTCGACACAATCTGCCCTTTCGAAAGATCCCAACGAAAAGCGTGACCACATGGTCCTTCTTGAGTTTGTAACTGCTGCTGGGATTACACATGGCATGGATGAGCTCGGCGGCGGCGGCAGCAAGGTCTACGGCAAGGAACAGTTTTTGCGGATGCGCCAGAGCATGTTCCCCGATCGCTAAATCGAGTAAGGATCTCCAGGCATCAAATAAAACGAAAGGCTCAGTCGAAAGACTGGGCCTTTCGTTTTATCTGTTGTTTGTCGGTGAACGCTCTCTACTAGAGTCACACTGGCTCACCTTCGGGTGGGCCTTTCTGCGTTTATACCTAGGGTACGGGTTTTGCTGCCCGCAAACGGGCTGTTCTGGTGTTGCTAGTTTGTTATCAGAATCGCAGATCCCGGCTTCAGCCGGG',
        name: 'Test Seq',
        circular: true,
        features: [
          {
            name: 'Feat 1',
            id: 'fakeId2',
            color: 'green',
            start: 1,
            end: 20
          },
          {
            name: 'Feat 2',
            id: 'fakeId233',
            color: 'red',
            start: 50,
            end: 130
          },
          {
            name: 'Feat 3',
            id: 'fakeI11d233',
            color: 'yellow',
            start: 300,
            end: 450
          },
          {
            name: 'Feat 23',
            id: 'aacc',
            color: 'purple',
            start: 600,
            end: 900
          }
        ],
        parts: [
          {
            name: 'Part 1',
            id: 'fakeId1',
            start: 10,
            end: 20
          },
          {
            name: 'Part 2',
            id: 'fakeId3',
            start: 25,
            end: 30
          },
          {
            name: 'Part 3',
            id: 'fakeId13',
            start: 60,
            end: 90
          },
          {
            name: 'Part 5',
            id: 'fakeId3',
            start: 90,
            end: 150
          },
          {
            name: 'Part 6',
            id: 'fakeId311',
            start: 500,
            end: 690
          }
        ]
      }}
    />
  </div>
);

export default SimpleCircularOrLinearViewDemo;
