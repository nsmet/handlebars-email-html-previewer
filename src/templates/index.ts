import newDevice from './new-device';
import WelcomeEmail from './welcome-email';
import Digest from './digest';

export default [
    {
        name: 'Digest',
        html: Digest.html,
        testData: Digest.testData
    },{
        name: 'New device',
        html: newDevice.html,
        testData: newDevice.testData
    },{
        name: 'Welcome Email',
        html: WelcomeEmail.html,
        testData: WelcomeEmail.testData
    },
]