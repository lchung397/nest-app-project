import { Contract } from './contract.entity';

describe('Contract Entity', () => {
  describe('isActive', () => {
    it('should return true when status is ACTIVE and within date range', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() + 1);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const contract = new Contract({
        id: '1',
        title: 'Test Contract',
        description: 'Test',
        status: 'ACTIVE',
        startDate: yesterday,
        endDate: tomorrow,
        value: 1000,
        userId: 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(contract.isActive()).toBe(true);
    });

    it('should return false when status is DRAFT', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const contract = new Contract({
        id: '1',
        title: 'Test Contract',
        description: 'Test',
        status: 'DRAFT',
        startDate: yesterday,
        endDate: tomorrow,
        value: 1000,
        userId: 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(contract.isActive()).toBe(false);
    });

    it('should return false when current date is before start date', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);

      const contract = new Contract({
        id: '1',
        title: 'Test Contract',
        description: 'Test',
        status: 'ACTIVE',
        startDate: tomorrow,
        endDate: nextWeek,
        value: 1000,
        userId: 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(contract.isActive()).toBe(false);
    });

    it('should return false when current date is after end date', () => {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const contract = new Contract({
        id: '1',
        title: 'Test Contract',
        description: 'Test',
        status: 'ACTIVE',
        startDate: lastWeek,
        endDate: yesterday,
        value: 1000,
        userId: 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(contract.isActive()).toBe(false);
    });
  });

  describe('canTerminate', () => {
    it('should return true when status is ACTIVE', () => {
      const contract = new Contract({
        id: '1',
        title: 'Test Contract',
        description: 'Test',
        status: 'ACTIVE',
        startDate: new Date(),
        endDate: new Date(),
        value: 1000,
        userId: 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(contract.canTerminate()).toBe(true);
    });

    it('should return true when status is DRAFT', () => {
      const contract = new Contract({
        id: '1',
        title: 'Test Contract',
        description: 'Test',
        status: 'DRAFT',
        startDate: new Date(),
        endDate: new Date(),
        value: 1000,
        userId: 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(contract.canTerminate()).toBe(true);
    });

    it('should return false when status is EXPIRED', () => {
      const contract = new Contract({
        id: '1',
        title: 'Test Contract',
        description: 'Test',
        status: 'EXPIRED',
        startDate: new Date(),
        endDate: new Date(),
        value: 1000,
        userId: 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(contract.canTerminate()).toBe(false);
    });

    it('should return false when status is TERMINATED', () => {
      const contract = new Contract({
        id: '1',
        title: 'Test Contract',
        description: 'Test',
        status: 'TERMINATED',
        startDate: new Date(),
        endDate: new Date(),
        value: 1000,
        userId: 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(contract.canTerminate()).toBe(false);
    });
  });

  describe('isExpired', () => {
    it('should return true when end date is in the past', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const contract = new Contract({
        id: '1',
        title: 'Test Contract',
        description: 'Test',
        status: 'ACTIVE',
        startDate: new Date('2024-01-01'),
        endDate: yesterday,
        value: 1000,
        userId: 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(contract.isExpired()).toBe(true);
    });

    it('should return false when end date is in the future', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const contract = new Contract({
        id: '1',
        title: 'Test Contract',
        description: 'Test',
        status: 'ACTIVE',
        startDate: new Date(),
        endDate: tomorrow,
        value: 1000,
        userId: 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(contract.isExpired()).toBe(false);
    });
  });
});
