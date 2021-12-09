export type PickNullable<T, K extends keyof T> = Omit<T, K> &
	Partial<Pick<T, K>>;

export type OmitPartial<T, K extends keyof T> = Partial<Omit<T, K>>;

export type PickPartial<T, K extends keyof T> = Partial<Pick<T, K>>;

export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends Array<infer U>
		? Array<DeepPartial<U>>
		: T[P] extends ReadonlyArray<infer U>
		? ReadonlyArray<DeepPartial<U>>
		: DeepPartial<T[P]>;
};
