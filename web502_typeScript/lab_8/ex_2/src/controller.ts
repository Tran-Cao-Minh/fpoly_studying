import { Request, Response } from 'express';
import { User } from './model';

export let users = (req: Request, res: Response) => {

  let users = [
    new User('James Coonce', 'jcoonce', 'james@none.com'),
    new User('Jim Coonce', 'jimcoonce', 'jim@none.com'),
    new User('Norman', 'jcoonce', 'norman@none.com'),
  ];

  res.json(users);
};

export let create = (req: Request, res: Response) => {
  res.json(req.body);
};