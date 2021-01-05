import { Service } from 'egg';
import crypto = require('crypto');
import { Op } from 'sequelize';

const secret =
  '4pzKckZH6JT4mQPXULEnL4AoRt4knDIvgRNfBkHjzxiRgtzFynaEB3NMFcd8jX/4izCde6SpBnxSn23UZL5tFA==';

export default class Auth extends Service {
  private saltPassword(password: string) {
    const salt = crypto.randomBytes(8).toString('base64');
    return {
      salt,
      password: crypto
        .createHmac('sha256', secret)
        .update(password.concat(salt))
        .digest('base64'),
    };
  }

  public findLinkedProviders(userId: string) {
    return this.ctx.model.ThirdPartyUserRecords.findAll({
      where: {
        userId,
      },
    });
  }

  public async getConsecutiveCheckInDays() {
    const records = <{ createdAt: string }[]>(
      (<unknown>await this.ctx.model.UserLoginRecord.findAll({
        //@ts-ignore
        where: { userId: this.ctx.user?.userId },
        order: [['createdAt', 'DESC']],
        raw: true,
        attributes: ['createdAt'],
      }))
    );

    const { dayjs } = this.app;

    const dates = [dayjs().add(1, 'day')].concat(
      records.map((record) => dayjs(record.createdAt))
    );

    let count = 1;

    for (let i = 0; i < dates.length - 1; i++) {
      if (
        dates[i].subtract(1, 'day').format('DD/MM/YYYY') ===
        dates[i + 1].format('DD/MM/YYYY')
      ) {
        count++;
      } else break;
    }

    return count;
  }

  public async addLoginRecord() {
    const { dayjs } = this.app;

    //@ts-ignore

    if (this.ctx.user?.userId) {
      const pre = await this.ctx.model.UserLoginRecord.findOne({
        where: {
          userId: this.ctx.user?.userId,
          //@ts-ignore
          createdAt: {
            [Op.between]: [
              // eslint-disable-next-line newline-per-chained-call
              dayjs().hour(0).minute(0).second(0).millisecond(0).toDate(),
              dayjs().toDate(),
            ],
          },
        },
      });

      // eslint-disable-next-line curly
      if (!pre)
        //@ts-ignore
        await this.ctx.user?.userModel.createUserLoginRecord();
    }
  }

  public verifyPassword(password: string, salt: string) {
    return crypto
      .createHmac('sha256', secret)
      .update(password.concat(salt))
      .digest('base64');
  }

  public getProviderNames() {}

  public async createProviderMetadata(record: thirdPartyUserRecordDAO) {
    return this.app.model.ThirdPartyUserRecords.create(record);
  }

  public async findLinkedLocalAccountId(providerId: string, provider: string) {
    return this.app.model.ThirdPartyUserRecords.findOne({
      where: { provider, providerId },
    });
  }

  public async findUserByPK(id: number) {
    return await this.app.model.User.findByPk(id);
  }

  public async createUser(userData: Partial<userDAO>) {
    const { salt, password } = this.saltPassword(userData.password as string);

    return await this.app.model.User.create({
      name: userData.name,
      email: userData.email || 'placeholder@example.com',
      avatarUrl: userData.avatarUrl,
      password,
      salt,
    });
  }
}
