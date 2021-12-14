import mysql, {MysqlError} from 'mysql';

class MySQL {
  config: mysql.ConnectionConfig;

  db: mysql.Connection;

  constructor() {
    this.config = {};
  }

  setConfig(config: mysql.ConnectionConfig): void {
    this.config = config;
  }

  async connect(): Promise<void> {
    this.db = mysql.createConnection(this.config);

    return new Promise((resolve, reject) => this.db.connect(err => (err ? reject(err) : resolve())));
  }

  async disconnect(): Promise<void> {
    await this.db.end();
  }

  async query(sql: string, args?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const cb = (err: any, rows: any) => (err ? reject(err) : resolve(rows));

      if (args) this.db.query(sql, args, cb);
      else this.db.query(sql, cb);
    });
  }

  async queryRow(sql: string, args?: any): Promise<any> {
    return (await this.query(sql, args))[0];
  }

  async startTransaction(): Promise<void> {
    return new Promise((resolve, reject) => this.db.beginTransaction(err => (err ? reject(err) : resolve())));
  }

  async commit(): Promise<void> {
    return new Promise((resolve, reject) => this.db.commit(err => (err ? reject(err) : resolve())));
  }

  async rollback(): Promise<void> {
    return new Promise((resolve, reject) => this.db.rollback(err => (err ? reject(err) : resolve())));
  }
}

export default MySQL;
