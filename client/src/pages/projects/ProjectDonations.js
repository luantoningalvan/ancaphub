import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import GridContainer from '../../components/ui/GridContainer';
import GridItem from '../../components/ui/GridItem';

const DonationCard = styled.div`
  position: relative;
  background: ${(props) => props.theme.palette.paper};
  width: 100%;
  padding: 16px;
  padding-top: 40px;
  border-radius: 8px;
  margin-top: 32px;
  line-wrap: wrap;

  .icon {
    position: absolute;
    top: -32px;
    width: 64px;
    height: 64px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }

  h4 {
    font-size: 1.4em;
    margin-bottom:8px;
  }

  font-size: 0.9em;
`;

const donations = {
  banks: [
    {
      name: 'Banco do Brasil',
      icon: 'https://img.ibxk.com.br/2015/1/programas/72479274.png',
    },
    {
      name: 'NuBank',
      icon:
        'https://static.poder360.com.br/2019/03/13237876_1084481698257155_4111187553134220399_n.png',
    },
    {
      name: 'Inter',
      icon:
        'https://lh3.googleusercontent.com/Cu1K2vb75TI5sZHBdBfLqw4H1vmpLGoKeEs7roSoQUrSm5UNHUtDRUKt5KRr4jm4XzQ',
    },
  ],
  crypto: [
    {
      name: 'Bitcoin',
      icon: 'https://pbs.twimg.com/profile_images/421692600446619648/dWAbC2wg_400x400.jpeg',
    },
    {
      name: 'Nano',
      icon:
        'https://hacked.com/wp-content/uploads/2018/02/NANO.jpg',
    },
    {
      name: 'Monero',
      icon:
        'https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2018/02/monero-2.png?fit=1280%2C1280&ssl=1',
    },
  ],
  apps: [
    {
      name: 'Picpay',
      icon:
        'https://pbs.twimg.com/profile_images/1145800664968257538/krdES7Mj.png',
    },
  ],
};

export default () => (
  <div>
    <h3 style={{ marginBottom: 8, fontSize: '1.4em' }}>
      <FormattedMessage id="common.crypto" />
    </h3>
    <GridContainer spacing={2}>
      {donations.crypto.map((donation) => (
        <GridItem xs={4}>
          <DonationCard>
            <img className="icon" src={donation.icon} alt="donate icon" />
            <ul>
              <h4>{donation.name}</h4>
              <li>
                <FormattedMessage id="projects.wallet" values={{ wallet: 'ba12ta34ti56nha78', b: (...chunks) => <b>{chunks}</b> }} />
              </li>
            </ul>
          </DonationCard>
        </GridItem>
      ))}
    </GridContainer>

    <h3 style={{ marginTop: 16, marginBottom: 8, fontSize: '1.4em' }}>
      Bancos
    </h3>
    <GridContainer spacing={2}>
      {donations.banks.map((donation) => (
        <GridItem xs={4}>
          <DonationCard>
            <img className="icon" src={donation.icon} alt="bank icon" />
            <ul>
              <h4>{donation.name}</h4>

              <li>
                <FormattedMessage id="projects.agency" values={{ agency: '000-0', b: (...chunks) => <b>{chunks}</b> }} />
              </li>
              <li>
                <FormattedMessage id="projects.account" values={{ acc: '0000-0', b: (...chunks) => <b>{chunks}</b> }} />
              </li>
              <li>
                <FormattedMessage id="projects.CPF" values={{ num: '000.000.000-00', b: (...chunks) => <b>{chunks}</b> }} />
              </li>
            </ul>
          </DonationCard>
        </GridItem>
      ))}
    </GridContainer>

    <h3 style={{ marginTop: 16, marginBottom: 8, fontSize: '1.4em' }}>
      <FormattedMessage id="projects.apps" />
    </h3>
    <GridContainer spacing={2}>
      {donations.apps.map((donation) => (
        <GridItem xs={4}>
          <DonationCard>
            <img src={donation.icon} className="icon" alt="payment app icon" />

            <h4>{donation.name}</h4>
            <ul>
              <li>
                <FormattedMessage id="projects.paymentAppUsername" values={{ username: 'ancapitao_miguxo_xd', b: (...chunks) => <b>{chunks}</b> }} />
              </li>
            </ul>
          </DonationCard>
        </GridItem>
      ))}
    </GridContainer>
  </div>
);
